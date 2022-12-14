export type Uuid = string;

export type Vendor = {
  uuid: Uuid;
  email: string;
  name: string;
};

export type Voucher = {
  uuid: Uuid;
  type: VoucherType;
  value: number;
  vendorUuid: Uuid;
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
