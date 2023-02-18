/**
 * Simple demo component that renders a list of all vendors.
 * Selecting a vendor fetches and displays all vouchers and transactions for the selected vendor.
 */

import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
  createVoucher,
  getAllVendors,
  getVouchersByVendorUuid,
  createTransaction,
  getAllTransactions,
  getTransactionsByVendorUuid,
} from './src/database/queries';
import {
  Vendor,
  Voucher,
  VoucherCreate,
  VoucherStatus,
  VoucherType,
  Transaction,
  TransactionCreate,
  TransactionStatus,
} from './src/types/types';

export default function VendorsListDemo() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  /* fetch all venders on page load */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allVendors = await getAllVendors();
        setVendors(allVendors);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('(useEffect)[VendorsListDemo]', error);
      }
    };
    fetchData();
  }, []);

  /* fetch vouchers and transactions by the selected vendor's uuid whenever selection changes */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedVendorVouchers = selectedVendor
          ? await getVouchersByVendorUuid(selectedVendor.uuid)
          : [];
        setVouchers(selectedVendorVouchers);

        const selectedVendorTransactions = selectedVendor
          ? await getTransactionsByVendorUuid(selectedVendor.uuid)
          : [];
        setTransactions(selectedVendorTransactions);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('(useEffect)[VendorsListDemo]', error);
      }
    };
    fetchData();
  }, [selectedVendor]);

  const onSelectVendor = async (vendor: Vendor) => setSelectedVendor(vendor);
  const onCreateVoucher = async () => {
    const voucher: VoucherCreate = {
      type: VoucherType.GREEN,
      value: 10,
      vendorUuid: 'abc',
      expirationDate: '4442',
      status: VoucherStatus.UNPAID,
    };
    const uuid = await createVoucher(voucher);
    // eslint-disable-next-line no-console
    console.log('New voucher uuid: ', uuid);
  };
  const onCreateTransaction = async () => {
    const v1: VoucherCreate = {
      type: VoucherType.GREEN,
      value: Math.floor(Math.random() * 2500) / 100,
      vendorUuid: 'abc',
      expirationDate: '4442',
      status: VoucherStatus.UNPAID,
    };
    const uuidV1 = await createVoucher(v1);
    const v2: VoucherCreate = {
      type: VoucherType.GREEN,
      value: Math.floor(Math.random() * 2500) / 100,
      vendorUuid: 'abc',
      expirationDate: '4442',
      status: VoucherStatus.UNPAID,
    };
    const uuidV2 = await createVoucher(v2);
    const v3: VoucherCreate = {
      type: VoucherType.GREEN,
      value: Math.floor(Math.random() * 2500) / 100,
      vendorUuid: 'abc',
      expirationDate: '4442',
      status: VoucherStatus.UNPAID,
    };
    const uuidV3 = await createVoucher(v3);
    const v4: VoucherCreate = {
      type: VoucherType.GREEN,
      value: Math.floor(Math.random() * 2500) / 100,
      vendorUuid: 'abc',
      expirationDate: '4442',
      status: VoucherStatus.UNPAID,
    };
    const uuidV4 = await createVoucher(v4);
    const transaction: TransactionCreate = {
      vendorUuid: 'abc',
      voucherArray: [uuidV1, uuidV2, uuidV3, uuidV4],
      status: TransactionStatus.UNPAID,
    };
    const uuid = await createTransaction(transaction);
    // eslint-disable-next-line no-console
    console.log('New transaction uuid: ', uuid);
  };

  return (
    <View>
      <Text>{`All Vendors (${vendors.length})`}</Text>
      <Text onPress={onCreateVoucher}>Create Vouchers</Text>
      <Text onPress={onCreateTransaction}>Create Transactions</Text>
      {vendors.map(vendor => (
        <View key={vendor.uuid} onTouchEnd={() => onSelectVendor(vendor)}>
          <Text>{`name: ${vendor.name} | uuid: ${vendor.uuid}`}</Text>
          <Text>{`email: ${vendor.email}`}</Text>
        </View>
      ))}

      {selectedVendor && (
        <View>
          <Text>{`Vouchers for ${selectedVendor?.name} (${vouchers.length})`}</Text>
          {vouchers.map(({ uuid, type, value }) => (
            <View key={uuid}>
              <Text>{`uuid: ${uuid}`}</Text>
              <Text>{`type: ${type}`}</Text>
              <Text>{`value: ${value}`}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
