import {
  addDoc,
  setDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
  Timestamp,
  getDoc,
} from 'firebase/firestore';
import {
  Uuid,
  Vendor,
  VoucherRange,
  Voucher,
  VoucherCreate,
  VoucherCreateError,
  VoucherCreateResult,
  Transaction,
  TransactionCreate,
  SerialNumberValidationResult,
} from '../types/types';
import fbApp from './clientApp';

const db = getFirestore(fbApp);
const testColl = collection(db, 'test-col');
const vendorCollection = collection(db, 'vendors');
const voucherRangeCollection = collection(db, 'voucher-ranges');
const voucherCollection = collection(db, 'vouchers');
const transactionCollection = collection(db, 'transactions');

/**
 * Function to test connection to Firestore.
 * This function should NOT be used in the app.
 */
export const getAllTestDocs = async () => {
  try {
    const dbQuery = query(testColl);
    const querySnapshots = await getDocs(dbQuery);
    querySnapshots.docs.map((document: QueryDocumentSnapshot<DocumentData>) =>
      // eslint-disable-next-line no-console
      console.log(document.data()),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getAllTestDocs)', e);
    throw e;
  }
};

/**
 * Get all vendors from the `vendors` collection.
 *
 * Returns an array of Vendor objects.
 */
export const getAllVendors = async (): Promise<Vendor[]> => {
  try {
    const dbQuery = query(vendorCollection);
    const querySnapshots = await getDocs(dbQuery);
    return querySnapshots.docs.map(document => document.data() as Vendor);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getAllVendors)', e);
    throw e;
  }
};

/**
 * Query the `vendors` collection and return a Vendor if the uuid is found.
 */
export const getVendor = async (uuid: Uuid): Promise<Vendor> => {
  try {
    const dbQuery = query(vendorCollection, where('uuid', '==', uuid));
    const querySnapshot = await getDocs(dbQuery);
    return querySnapshot.docs[0]?.data() as Vendor;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getVendor)', e);
    throw e;
  }
};

/**
 * Query the `vendors` collection and return a Vendor if the email is found.
 */
export const getVendorByEmail = async (
  email: string | null,
): Promise<Vendor> => {
  try {
    const dbQuery = query(vendorCollection, where('email', '==', email));
    const querySnapshot = await getDocs(dbQuery);
    return querySnapshot.docs[0]?.data() as Vendor;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getVendorByEmail)', e);
    throw e;
  }
};

/**
 * Get all voucher ranges from the `voucher-ranges` collection.
 *
 * Returns an array of VoucherRange objects.
 */
export const getAllVoucherRanges = async (): Promise<VoucherRange[]> => {
  try {
    const dbQuery = query(voucherRangeCollection);
    const querySnapshots = await getDocs(dbQuery);
    return querySnapshots.docs.map(document => document.data() as VoucherRange);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getAllVoucherRanges)', e);
    throw e;
  }
};

/**
 * Query the `voucher-ranges` collection.
 *
 * Returns a VoucherRange if the given serialNumber is in any voucher range.
 *
 * Otherwise, return null.
 */
export const getVoucherRange = async (
  serialNumber: number,
): Promise<VoucherRange | null> => {
  try {
    const dbQuery = query(
      voucherRangeCollection,
      where('endSerialNum', '>=', serialNumber),
    );
    const querySnapshot = await getDocs(dbQuery);

    if (querySnapshot.docs.length > 0) {
      const result = querySnapshot.docs[0]?.data() as VoucherRange;
      if (result.startSerialNum <= serialNumber) {
        return result;
      }
    }

    return null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getVoucherRange)', e);
    throw e;
  }
};

/**
 * Query the `vouchers` collection and return a Voucher if the serialNumber is found.
 */
export const getVoucher = async (serialNumber: number): Promise<Voucher> => {
  try {
    const dbQuery = query(
      voucherCollection,
      where('serialNumber', '==', serialNumber),
    );
    const querySnapshot = await getDocs(dbQuery);
    return querySnapshot.docs[0]?.data() as Voucher;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getVoucher)', e);
    throw e;
  }
};

/**
 * Query to validate an inputted serial number in Firebase and
 * return the maxVoucherValue for use in the following screens.
 *
 * Parameters: a json with fields
 *
 *    `serialNumber`: voucher serial number
 *
 * Returns a json.
 *
 * If the query executes successfully, `ok` is true and `maxValue` contains
 * the maximum dollar input allowed for the given voucher type.
 *
 * Otherwise, `ok` is false and `error` contains an error code.
 */
export const getMaxVoucherValue = async (
  serialNumber: number,
): Promise<SerialNumberValidationResult> => {
  try {
    const docId = serialNumber.toString();
    const docRef = doc(db, 'vouchers', docId);
    // check that serialNumber exists within the NPO's defined range of vouchers
    const voucherRange = await getVoucherRange(serialNumber);
    if (voucherRange === null) {
      return { ok: false, error: VoucherCreateError.InvalidSerialNumber };
    }
    // check that serialNumber has not already been used
    const voucherDoc = await getDoc(docRef);
    if (voucherDoc.exists()) {
      return { ok: false, error: VoucherCreateError.SerialNumberAlreadyUsed };
    }
    return { ok: true, maxValue: voucherRange.maxValue };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getVoucher)', e);
    throw e;
  }
};

/**
 * Query to create a new voucher in Firebase.
 *
 * Parameters: a json with fields
 *
 *    `serialNumber`: voucher serial number
 *
 *    `value`: monetary value of voucher in cents
 *
 *    `vendorUuid`: current user's Uuid
 *
 * Returns a json.
 *
 * If the query executes successfully, `ok` is true and `docId` contains
 * the newly created doc id.
 *
 * Otherwise, `ok` is false and `error` contains an error code.
 */
export const createVoucher = async (
  voucher: VoucherCreate,
): Promise<VoucherCreateResult> => {
  try {
    const docId = voucher.serialNumber.toString();
    const docRef = doc(db, 'vouchers', docId);

    // check that serialNumber exists
    const voucherRange = await getVoucherRange(voucher.serialNumber);
    if (voucherRange === null) {
      return { ok: false, error: VoucherCreateError.InvalidSerialNumber };
    }

    // check that serialNumber has not already been used
    const voucherDoc = await getDoc(docRef);
    if (voucherDoc.exists()) {
      return { ok: false, error: VoucherCreateError.SerialNumberAlreadyUsed };
    }

    // check that value does not exceed the maximum
    if (voucherRange.maxValue < voucher.value) {
      return { ok: false, error: VoucherCreateError.ValueExceededMaximum };
    }

    await setDoc(docRef, voucher);
    await updateDoc(docRef, { type: voucherRange.type });
    return { ok: true, docId };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(createVoucher)', e);
    throw e;
  }
};

/**
 * Fetch all vouchers for a given vendor.
 *
 * Returns an array of Voucher objects.
 */
export const getVouchersByVendorUuid = async (
  vendorUuid: Uuid,
): Promise<Voucher[]> => {
  try {
    const dbQuery = query(
      voucherCollection,
      where('vendorUuid', '==', vendorUuid),
    );
    const querySnapshots = await getDocs(dbQuery);
    return querySnapshots.docs.map(document => document.data() as Voucher);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getVouchersByVendorUuid)', e);
    throw e;
  }
};

/**
 * Query the `transactions` collection and return a Transaction if the uuid is found.
 */
export const getTransaction = async (uuid: Uuid): Promise<Transaction> => {
  try {
    const dbQuery = query(transactionCollection, where('uuid', '==', uuid));
    const querySnapshot = await getDocs(dbQuery);
    return querySnapshot.docs[0]?.data() as Transaction;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getTransaction)', e);
    throw e;
  }
};
/**
 * Helper for calculating a Transaction's value.
 *
 * Returns the sum in cents of all vouchers in the given array.
 */
export const calculateTotalVouchersValue = async (
  voucherSerialNumbers: number[],
) => {
  try {
    let totalValue = 0;
    await Promise.all(
      voucherSerialNumbers.map(async v => {
        const voucher = await getVoucher(v);
        totalValue += voucher.value;
      }),
    );
    return totalValue;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(calculateTotalVouchersValue)', e);
    throw e;
  }
};

/**
 * Query to create a new transaction in Firebase.
 *
 * Parameters: a json with fields
 *
 *    `status`: the payment status of a transaction
 *
 *    `voucherSerialNumbers`: an array of voucher serial numbers
 *
 *    `vendorUuid`: current user's Uuid
 *
 * Returns the doc id if the query executes successfully.
 */
export const createTransaction = async (
  transaction: TransactionCreate,
): Promise<Uuid> => {
  try {
    const docRef = await addDoc(transactionCollection, transaction);
    const value = await calculateTotalVouchersValue(
      transaction.voucherSerialNumbers,
    );
    await updateDoc(docRef, {
      uuid: docRef.id,
      timestamp: new Timestamp(Math.floor(Date.now() / 1000), 0),
      value,
    });
    return docRef.id;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(createTransaction)', e);
    throw e;
  }
};

/**
 * Helper for all Transaction setter functions.
 */
const updateTransaction = async (transaction: Partial<Transaction>) => {
  try {
    const docRef = doc(voucherCollection, transaction.uuid);
    await updateDoc(docRef, transaction);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(updateTransaction)', e);
    throw e;
  }
};

/**
 * Setter function to update a Transaction's voucherSerialNumbers.
 */
export const setTransactionVoucherSerialNumbers = async (
  uuid: Uuid,
  voucherSerialNumbers: number[],
) => {
  const value = await calculateTotalVouchersValue(voucherSerialNumbers);
  updateTransaction({ uuid, voucherSerialNumbers, value });
};

/**
 * Fetch all transactions for a given vendor.
 *
 * Returns an array of Transaction objects.
 */
export const getTransactionsByVendorUuid = async (
  vendorUuid: Uuid,
): Promise<Transaction[]> => {
  try {
    const dbQuery = query(
      transactionCollection,
      where('vendorUuid', '==', vendorUuid),
    );
    const querySnapshots = await getDocs(dbQuery);
    return querySnapshots.docs.map(document => document.data() as Transaction);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getTransactionsByVendorUuid)', e);
    throw e;
  }
};
