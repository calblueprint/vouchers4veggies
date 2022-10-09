export type uuid = string;

export type Vendor = {
  uuid: uuid;
  email: string;
  name: string;
};

export type Voucher = {
  uuid: uuid;
  type: VoucherType;
  value: number;
  vendorUuid: uuid;
  expiration_date: string;
};

export type VoucherCreate = Pick<
  Voucher,
  'type' | 'value' | 'vendorUuid' | 'expiration_date'
>;

export enum VoucherType {
  GREEN,
  ORANGE,
  PURPLE,
}
