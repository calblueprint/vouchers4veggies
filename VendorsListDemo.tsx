/**
 * Simple demo component that renders a list of all vendors.
 * Selecting a vendor fetches and displays all vouchers for the selected vendor.
 */

import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
  createVoucher,
  getAllVendors,
  getVouchersByVendorUuid,
} from './src/database/queries';
import { Vendor, Voucher, VoucherCreate, VoucherType } from './src/types/types';

export default function VendorsListDemo() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  /* fetch all vouchers on page load */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allVendors = await getAllVendors();
        setVendors(allVendors);
      } catch (error) {
        console.error('(useEffect)[VendorsListDemo]', error);
      }
    };
    fetchData();
  }, []);

  /* fetch vouchers by the selected vendor's uuid whenever selection changes */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedVendorVouchers = selectedVendor
          ? await getVouchersByVendorUuid(selectedVendor.uuid)
          : [];

        setVouchers(selectedVendorVouchers);
      } catch (error) {
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
      expiration_date: '4442',
    };
    const uuid = await createVoucher(voucher);
    console.log('New uuid: ', uuid);
  };

  return (
    <View>
      <Text>{`All Vendors (${vendors.length})`}</Text>
      <Text onPress={onCreateVoucher}>{`Create Vouchers`}</Text>
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
