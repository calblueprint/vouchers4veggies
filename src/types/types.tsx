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

export enum VoucherType {
  GREEN,
  ORANGE,
  PURPLE,
}
