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
} from 'firebase/firestore';
import {
  Uuid,
  Vendor,
  VoucherRange,
  VoucherRangeCreate,
  Voucher,
  VoucherCreate,
  Transaction,
  TransactionCreate,
  TransactionStatus,
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
    console.warn('(getAllVouchers)', e);
    throw e;
  }
};

/**
 * Query to create a new voucher range in Firebase for serial numbers in
 * the range [startSerialNum, endSerialNum].
 *
 * Parameters: a json with fields
 *
 *    `startSerialNum`: serial number for the start of the range, inclusive
 *
 *    `endSerialNum`: serial number for the end of the range, inclusive
 *
 *    `type`: the color of vouchers in this range
 *
 *    `maxValue`: maximum monetary value in cents for a range in this range
 *
 * Returns the doc id if query is successful. If the range overlaps with a pre-existing VoucherRange, return `-1`.
 */
export const createVoucherRange = async (
  voucherRange: VoucherRangeCreate,
): Promise<Uuid> => {
  try {
    const docRef = await addDoc(voucherRangeCollection, voucherRange);
    await updateDoc(docRef, voucherRange);
    return docRef.id;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(createVoucherRange)', e);
    throw e;
  }
};

/**
 * Get all vouchers from the `vouchers` collection.
 */
export const getAllVouchers = async (): Promise<Voucher[]> => {
  try {
    const dbQuery = query(voucherCollection);
    const querySnapshots = await getDocs(dbQuery);

    return querySnapshots.docs.map(document => document.data() as Voucher);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getAllVouchers)', e);
    throw e;
  }
};

/**
 * Query the `vouchers` collection and return a Voucher if the uuid is found.
 */
export const getVoucher = async (uuid: Uuid): Promise<Voucher> => {
  try {
    const dbQuery = query(voucherCollection, where('uuid', '==', uuid));
    const querySnapshot = await getDocs(dbQuery);
    return querySnapshot.docs[0]?.data() as Voucher;
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
 */
export const createVoucher = async (voucher: VoucherCreate): Promise<Uuid> => {
  try {
    const docRef = doc(db, 'vouchers', voucher.serialNumber);
    await setDoc(docRef, voucher);
    await updateDoc(docRef, {
      type: 'to fix',
    });
    return voucher.serialNumber;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(createVoucher)', e);
    throw e;
  }
};

/**
 * Helper for all setter functions
 */
const updateVoucher = async (voucher: Partial<Voucher>) => {
  try {
    const docRef = doc(voucherCollection, voucher.serialNumber);
    await updateDoc(docRef, voucher);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(updateVoucher)', e);
    throw e;
  }
};

/**
 * Update a Voucher's value in cents
 */
export const setVoucherValue = async (serialNumber: string, value: number) =>
  updateVoucher({ serialNumber, value });

/**
 * Fetch all vouchers for a given vendor.
 */
export const getVouchersByVendorUuid = async (
  vendorUuid: Uuid,
): Promise<Voucher[]> => {
  try {
    const dbQuery = query(
      voucherCollection,
      where('vendor_uuid', '==', vendorUuid),
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
 * Get all transactions from the `transactions` collection.
 */
export const getAllTransactions = async (): Promise<Transaction[]> => {
  try {
    const dbQuery = query(transactionCollection);
    const querySnapshots = await getDocs(dbQuery);

    return querySnapshots.docs.map(document => document.data() as Transaction);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getAllTransactions)', e);
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
 * Helper for all setter functions
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
 *  Helper for calculating a Transaction's value
 */
export const calculateValue = async (voucherArray: Uuid[]) => {
  let value = 0;
  await Promise.all(
    voucherArray.map(async v => {
      const voucher = await getVoucher(v);
      value += voucher.value;
    }),
  );
  return value;
};

/**
 * Query to create a new transaction in Firebase.
 *
 * Parameters: a json with fields
 *
 *    `status`: the payment status of a transaction
 *
 *    `voucherArray`: an array of strings representing voucher serial numbers
 *
 *    `vendorUuid`: current user's Uuid
 */
export const createTransaction = async (
  transaction: TransactionCreate,
): Promise<Uuid> => {
  try {
    const docRef = await addDoc(transactionCollection, transaction);
    const value = await calculateValue(transaction.voucherArray);
    await updateDoc(docRef, {
      uuid: docRef.id,
      timestamp: new Timestamp(Date.now(), 0),
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
 * Setter function to update a Transaction's status
 */
export const setTransactionStatus = async (
  uuid: Uuid,
  status: TransactionStatus,
) => updateTransaction({ uuid, status });

/**
 * Setter function to update a Transaction's voucherArray
 */
export const setTransactionVoucherArray = async (
  uuid: Uuid,
  voucherArray: Uuid[],
) => {
  const value = await calculateValue(voucherArray);
  updateTransaction({ uuid, voucherArray, value });
};

/**
 * Fetch all transactions for a given vendor.
 */
export const getTransactionsByVendorUuid = async (
  vendorUuid: Uuid,
): Promise<Transaction[]> => {
  try {
    const dbQuery = query(
      transactionCollection,
      where('vendor_uuid', '==', vendorUuid),
    );
    const querySnapshots = await getDocs(dbQuery);
    return querySnapshots.docs.map(document => document.data() as Transaction);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('(getTransactionsByVendorUuid)', e);
    throw e;
  }
};
