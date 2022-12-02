import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  updateDoc,
  doc,
  FieldValue,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import {
  uuid,
  Vendor,
  Voucher,
  VoucherCreate,
  VoucherStatus,
  Transaction,
  TransactionCreate,
} from '../types/types';
import fbApp from './clientApp';

const db = getFirestore(fbApp);
const testColl = collection(db, 'test-col');
const vendorCollection = collection(db, 'vendors');
const voucherCollection = collection(db, 'vouchers');
const transactionCollection = collection(db, 'transactions');

export const getAllTestDocs = async () => {
  try {
    const dbQuery = query(testColl);
    const querySnapshots = await getDocs(dbQuery);
    querySnapshots.docs.map((doc: { data: () => any }) =>
      console.log(doc.data()),
    );
  } catch (e) {
    console.warn('(getAllTestDocs)', e);
    throw e;
  }
};

/**
 * Get all vendors from the `vendors` collection
 */
export const getAllVendors = async (): Promise<Vendor[]> => {
  try {
    const dbQuery = query(vendorCollection);
    const querySnapshots = await getDocs(dbQuery);

    return querySnapshots.docs.map(doc => doc.data() as Vendor);
  } catch (e) {
    console.warn('(getAllVendors)', e);
    throw e;
  }
};

/**
 * Query the `vendors` collection and return a Vendor if the uuid is found.
 */
export const getVendor = async (uuid: uuid): Promise<Vendor> => {
  try {
    const dbQuery = query(vendorCollection, where('uuid', '==', uuid));
    const querySnapshot = await getDocs(dbQuery);
    return querySnapshot.docs[0]?.data() as Vendor;
  } catch (e) {
    console.warn('(getVendor)', e);
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

    return querySnapshots.docs.map(doc => doc.data() as Voucher);
  } catch (e) {
    console.warn('(getAllVouchers)', e);
    throw e;
  }
};

/**
 * Query the `vouchers` collection and return a Voucher if the uuid is found.
 */
export const getVoucher = async (uuid: uuid): Promise<Voucher> => {
  try {
    const dbQuery = query(voucherCollection, where('uuid', '==', uuid));
    const querySnapshot = await getDocs(dbQuery);
    return querySnapshot.docs[0]?.data() as Voucher;
  } catch (e) {
    console.warn('(getVoucher)', e);
    throw e;
  }
};

export const createVoucher = async (voucher: VoucherCreate): Promise<uuid> => {
  try {
    const docRef = await addDoc(voucherCollection, voucher);
    await updateDoc(docRef, { uuid: docRef.id });
    return docRef.id;
  } catch (e) {
    console.warn('(createVoucher)', e);
    throw e;
  }
};

/**
 * Helper for all setter functions
 */
const updateVoucher = async (voucher: Partial<Voucher>) => {
  try {
    const docRef = doc(voucherCollection, voucher.uuid);
    await updateDoc(docRef, voucher);
  } catch (e) {
    console.warn('(updateVoucher)', e);
    throw e;
  }
};

/**
 * Setter function to update a Voucher's status
 */
export const setVoucherStatus = async (uuid: uuid, status: VoucherStatus) =>
  updateVoucher({ uuid, status });

/**
 * Setter function to update a Voucher's VendorUuid
 */
export const setVoucherVendorUuid = async (uuid: uuid, vendorUuid: uuid) =>
  updateVoucher({ uuid, vendorUuid });

/**
 * Fetch all vouchers for a given vendor.
 */
export const getVouchersByVendorUuid = async (
  vendor_uuid: uuid,
): Promise<Voucher[]> => {
  try {
    const dbQuery = query(
      voucherCollection,
      where('vendor_uuid', '==', vendor_uuid),
    );
    const querySnapshots = await getDocs(dbQuery);
    return querySnapshots.docs.map(doc => doc.data() as Voucher);
  } catch (e) {
    console.warn('(getVouchersByVendorUuid)', e);
    throw e;
  }
};

export const createTransaction = async (
  transaction: TransactionCreate,
): Promise<uuid> => {
  try {
    const docRef = await addDoc(transactionCollection, transaction);
    await updateDoc(docRef, { uuid: docRef.id });
    return docRef.id;
  } catch (e) {
    console.warn('(createTransaction)', e);
    throw e;
  }
};

/**
 * Get all transactions from the `transactions` collection
 */
export const getAllTransactions = async (): Promise<Transaction[]> => {
  try {
    const dbQuery = query(transactionCollection);
    const querySnapshots = await getDocs(dbQuery);

    return querySnapshots.docs.map(doc => doc.data() as Transaction);
  } catch (e) {
    console.warn('(getAllTransactions)', e);
    throw e;
  }
};

/**
 * Get all transactions for Vendor
 */
export const getVendorTransactions = async (
  vendorUuid: string,
): Promise<Transaction[]> => {
  try {
    const dbQuery = query(
      transactionCollection,
      where('vendorUUID', '==', vendorUuid),
    );
    const querySnapshots = await getDocs(dbQuery);
    return querySnapshots.docs.map(doc => doc.data() as Transaction);
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

/**
 * Return a Transaction if the uuid is found.
 */
export const getTransaction = async (uuid: uuid): Promise<Transaction> => {
  try {
    const dbQuery = query(transactionCollection, where('uuid', '==', uuid));
    const querySnapshot = await getDocs(dbQuery);
    return querySnapshot.docs[0]?.data() as Transaction;
  } catch (e) {
    console.warn('(getTransaction)', e);
    throw e;
  }
};

const updateTransaction = async (transaction: Partial<Transaction>) => {
  try {
    const docRef = doc(transactionCollection, transaction.uuid);
    await updateDoc(docRef, transaction);
  } catch (e) {
    console.warn('(updateVoucher)', e);
    throw e;
  }
};

/**
 *
 * @param uuid | Transaction uuid
 * @param voucherUUID | voucher to add
 */
export const addVoucherToTransaction = async (
  uuid: uuid,
  voucherUUID: string,
): Promise<void> => {
  try {
    const docRef = doc(transactionCollection, uuid);

    const transaction = await getTransaction(uuid);
    const transactionVouchers = transaction.vouchers;
    transaction.vouchers.push(voucherUUID);
    await updateDoc(docRef, { vouchers: transactionVouchers });
    // const docRef = doc
    // // const docRef = query(
    // //   transactionCollection,
    // //   where('uuid', '==', transactionUUID),
    // // );
    // const querySnapshot = await getDocs(docRef);
    // const transacArray = querySnapshot.docs.map(
    //   doc => doc.data() as Transaction,
    // );
    // const transacVouchers = transacArray[0].vouchers;
    // // console.log('QSnapshot: ', querySnapshot.docs);
    // console.log('Transaction: ', transacArray);
    // console.log('Vouchers: ', transacVouchers);
    // transacVouchers.push(voucherUUID);
    // console.log('Updated Vouchers', transacVouchers);
  } catch (e) {
    console.warn('(addVoucherToTransaction)', e);
    throw e;
  }
};

/**
 * Remove a Voucher to the voucher array in the `Transaction` collection.
 */
export const removeVoucherFromTransaction = async (
  transactionUUID: uuid,
  voucherUUID: uuid,
): Promise<void> => {
  try {
    const docRef = query(
      transactionCollection,
      where('transactions', '==', transactionUUID),
    );
    const querySnapshot = await getDocs(docRef);
    const transacArray = querySnapshot.docs.map(
      doc => doc.data() as Array<String>,
    );
    docRef.update({ Vouchers: FieldValue.arrayUnion(voucherUUID) });
  } catch (e) {
    console.warn('(removeVoucherFromTransaction)', e);
    throw e;
  }
};

//Test your queries here
export const testQueries = async () => {
  //Noah Transac Test - HxMk3UuwzP7zrxsitpws
  //Test voucher to add - UFP3gWFeIajfbih3Uimo
  const vendor = await getVendorTransactions('HxMk3UuwzP7zrxsitpws'); // works
  console.log('getVendorTransactions: ', vendor);
  const testGet = await getTransaction('1hXxw6dKCwBop9mFuXbj'); // works
  console.log('getTransaction: ', testGet);
  const testAdd = await addVoucherToTransaction(
    '1hXxw6dKCwBop9mFuXbj',
    'UFP3gWFeIajfbih3Uimo',
  );
  // );
};
