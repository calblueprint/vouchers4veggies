import { Timestamp } from 'firebase/firestore';

export type SelectionProps = {
  isSelected: boolean;
};

export type Uuid = string;

export type Vendor = {
  uuid: Uuid;
  email: string;
  name: string;
};

export type VoucherType = {
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
  'serialNumber' | 'vendorUuid' | 'value' | 'type'
>;

export enum VoucherCreateError {
  InvalidSerialNumber = 'InvalidSerialNumber',
  SerialNumberAlreadyUsed = 'SerialNumberAlreadyUsed',
  ValueExceededMaximum = 'ValueExceededMaximum',
}

export type SerialNumberValidationResult =
  | { ok: false; error: VoucherCreateError }
  | { ok: true; voucherType: VoucherType };

export type VoucherCreateResult =
  | { ok: true; docId: string }
  | { ok: false; error: VoucherCreateError };

export enum VoucherValueError {
  ZeroValue = 'Zero Value',
  ExceedMax = 'ValueExceededMaximum',
}

export type VoucherValueResult =
  | { ok: true; error: null }
  | { ok: false; error: VoucherValueError };

export type Invoice = {
  uuid: Uuid;
  timestamp: Timestamp;
  status: InvoiceStatus;
  value: number;
  voucherSerialNumbers: number[];
  vendorUuid: Uuid;
};

export type InvoiceCreate = Pick<
  Invoice,
  'status' | 'voucherSerialNumbers' | 'vendorUuid'
>;

export enum InvoiceStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
}
