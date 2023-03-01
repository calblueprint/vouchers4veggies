import { Timestamp } from 'firebase/firestore';

export type Uuid = string;

export type Vendor = {
  uuid: Uuid;
  email: string;
  name: string;
};

export type VoucherRange = {
  startSerialNum: number;
  endSerialNum: number;
  type: string;
  maxValue: number;
};

export type Voucher = {
  serialNumber: number;
  type: string;
  value: number;
  vendorUuid: Uuid;
};

export type VoucherCreate = Pick<
  Voucher,
  'serialNumber' | 'vendorUuid' | 'value'
>;

export enum VoucherCreateError {
  InvalidSerialNumber,
  SerialNumberAlreadyUsed,
  ValueExceededMaximum,
}

export type VoucherCreateResult =
  | { ok: true; docId: string }
  | { ok: false; error: VoucherCreateError };

export type Transaction = {
  uuid: Uuid;
  timestamp: Timestamp;
  status: TransactionStatus;
  value: number;
  voucherSerialNumbers: number[];
  vendorUuid: Uuid;
};

export type TransactionCreate = Pick<
  Transaction,
  'status' | 'voucherSerialNumbers' | 'vendorUuid'
>;

export enum TransactionStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
}
