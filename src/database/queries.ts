import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  getFirestore,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { uuid, Vendor, Voucher, VoucherCreate, VoucherStatus, VendorCreate } from '../types/types';
import fbApp from './clientApp';

const db = getFirestore(fbApp);
const testColl = collection(db, 'test-col');
const vendorCollection = collection(db, 'vendors');
const voucherCollection = collection(db, 'vouchers');

export const getAllTestDocs = async () => {
  try {
    const dbQuery = query(testColl);
    const querySnapshots = await getDocs(dbQuery);
    querySnapshots.docs.map(doc => console.log(doc.data()));
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

/**
 * Create a new "vendor" document and at it to the vendors collection.
 */
export const createVendor = async (vendor: VendorCreate): Promise<uuid> => {
  try {
    const docRef = await addDoc(vendorCollection, vendor);
    await updateDoc(docRef, { uuid: docRef.id});
    return docRef.id; 
  } catch (e) {
    console.warn('(createVendor)', e);
    throw e;
  }
}

/**
 * Update an existing "vendor" name. 
 */
export const updateVendorName = async (name: string, vendor: Partial<Vendor>) => {
  try {
    const docRef = doc(vendorCollection, vendor.uuid);
    await updateDoc(docRef, {name: name})
  } catch (e) {
  console.warn('(updateVendorName)', e);
  throw e;
  }
}

/**
 * Update an existing "vendor's" email. 
 */
export const updateVendorEmail = async (email: string, vendor: Partial<Vendor>) => {
  try {
    const docRef = doc(vendorCollection, vendor.uuid);
    await updateDoc(docRef, {email: email})
  } catch (e) {
  console.warn('(updateVendorEmail)', e);
  throw e;
  }
}

/**
 * Delete a "vendor" document in the vendors collection given its uuid.
 */
export async function deleteVendor(vendor: Vendor) {
  try {
    await deleteDoc(doc(vendorCollection, 
      vendor.uuid))
  } catch (e) {
    console.warn('(deleteVendor)', e);
    throw e;
  }
}