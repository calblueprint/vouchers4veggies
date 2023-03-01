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
  getTransactionsByVendorUuid,
} from './src/database/queries';
import {
  Vendor,
  Voucher,
  VoucherCreate,
  Transaction,
  TransactionCreate,
  TransactionStatus,
} from './src/types/types';

export default function VendorsListDemo() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  /* fetch all vendors on page load */
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
  const onCreateInvalidVoucher = async () => {
    const voucher: VoucherCreate = {
      serialNumber: 9,
      value: 10,
      vendorUuid: 'abc',
    };
    const uuid = await createVoucher(voucher);
    // eslint-disable-next-line no-console
    console.log('Error code: ', uuid);
  };
  const onCreateDuplicateVoucher = async () => {
    const voucher: VoucherCreate = {
      serialNumber: 100,
      value: 10,
      vendorUuid: 'abc',
    };
    const uuid = await createVoucher(voucher);
    // eslint-disable-next-line no-console
    console.log('Error code: ', uuid);
  };
  const onCreateValueTooHighVoucher = async () => {
    const voucher: VoucherCreate = {
      serialNumber: 110,
      value: 10000000,
      vendorUuid: 'abc',
    };
    const uuid = await createVoucher(voucher);
    // eslint-disable-next-line no-console
    console.log('Error code: ', uuid);
  };
  const onCreateVoucher = async () => {
    const voucher: VoucherCreate = {
      serialNumber: 104,
      value: 91,
      vendorUuid: 'abc',
    };
    const uuid = await createVoucher(voucher);
    // eslint-disable-next-line no-console
    console.log('Serial Number: ', uuid);
  };

  const onCreateTransaction = async () => {
    const voucherArray = [100, 101];
    const transaction: TransactionCreate = {
      vendorUuid: 'abc',
      voucherSerialNumbers: voucherArray,
      status: TransactionStatus.UNPAID,
    };
    const uuid = await createTransaction(transaction);
    // eslint-disable-next-line no-console
    console.log('New transaction uuid: ', uuid);
  };

  return (
    <View>
      <Text>{`All Vendors (${vendors.length})`}</Text>
      <Text onPress={onCreateInvalidVoucher}>Create Voucher Out of Range</Text>
      <Text onPress={onCreateDuplicateVoucher}>Create Duplicate Voucher</Text>
      <Text onPress={onCreateValueTooHighVoucher}>
        Create Voucher With High Value
      </Text>
      <Text onPress={onCreateVoucher}>Create Voucher</Text>
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
          {vouchers.map(({ serialNumber, type, value }) => (
            <View key={serialNumber}>
              <Text>{`uuid: ${serialNumber}`}</Text>
              <Text>{`type: ${type}`}</Text>
              <Text>{`value: ${value}`}</Text>
            </View>
          ))}
          <Text>{`Transactions for ${selectedVendor?.name} (${transactions.length})`}</Text>
          {transactions.map(({ uuid, value }) => (
            <View key={uuid}>
              <Text>{`uuid: ${uuid}`}</Text>
              <Text>{`value: ${value}`}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
