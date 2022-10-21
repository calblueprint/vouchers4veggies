import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  doc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { uuid, Vendor, Voucher, VoucherCreate } from '../types/types';
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

// TODO: Convert ENUM to actual type
export const createVoucher = async (voucher: VoucherCreate): Promise<uuid> => {
  try {
    const docRef = await addDoc(voucherCollection, voucher);
    console.log('Document ref id: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.warn('(createVoucher)', e);
    throw e;
  }
};

/**
 * Find a Voucher using uuid and update its vendorUuid if found.
 */
export const setVoucherVendorUuid = async (
  uuid: uuid,
  vendor_uuid: uuid,
): Promise<void> => {
  try {
    const docRef = doc(db, 'vouchers', uuid);
    const data = {
      vendorUuid: vendor_uuid,
    };
    await updateDoc(docRef, data);
    return;
  } catch (e) {
    console.warn('(setVoucherVendorUuid)', e);
    throw e;
  }
};

/**
 * Find a Voucher using uuid and update its status if found.
 */
export const setVoucherStatus = async (
  uuid: uuid,
  status: string,
): Promise<void> => {
  try {
    const docRef = doc(db, 'vouchers', uuid);
    const data = {
      status: status,
    };
    await updateDoc(docRef, data);
    return;
  } catch (e) {
    console.warn('(setVoucherStatus)', e);
    throw e;
  }
};

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
