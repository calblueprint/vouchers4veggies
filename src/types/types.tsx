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
  expirationDate: string;
  status: VoucherStatus;
};

export type VoucherCreate = Pick<
  Voucher,
  'type' | 'value' | 'vendorUuid' | 'expirationDate' | 'status'
>;

export enum VoucherType {
  GREEN = 'green',
  ORANGE = 'orange',
  PURPLE = 'purple',
}

export enum VoucherStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
}

export type Transaction = {
  date: string;
  uuid: uuid;
  vendorUUID: uuid;
  vouchers: Array<uuid>;
}
