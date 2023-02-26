import { Timestamp } from 'firebase/firestore';

export type Uuid = string;

export type Vendor = {
  uuid: Uuid;
  email: string;
  name: string;
};

export type Voucher = {
  serialNumber: string;
  type: VoucherType;
  value: number;
  vendorUuid: Uuid;
};

export type VoucherCreate = Pick<
  Voucher,
  'serialNumber' | 'vendorUuid' | 'value'
>;

export enum VoucherType {
  GREEN = 'green',
  ORANGE = 'orange',
  PURPLE = 'purple',
}

export type Transaction = {
  uuid: Uuid;
  timestamp: Timestamp;
  status: TransactionStatus;
  value: number;
  voucherArray: string[];
  vendorUuid: Uuid;
};

export type TransactionCreate = Pick<
  Transaction,
  'status' | 'voucherArray' | 'vendorUuid'
>;

export enum TransactionStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
}
