import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Start: undefined;
  Login: undefined;
  ForgotPassword: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Invoices: undefined;
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  MaterialBottomTabNavigationProp<BottomTabParamList, T>;

export type ScannerStackParamList = {
  ScanningScreen: undefined;
  ManualVoucherScreen: undefined;
  VoucherBatchScreen: undefined;
  ConfirmValueScreen: {
    serialNumber: number;
    maxValue: number;
    type: string;
  };
  ReviewScreen: undefined;
  ConfirmationScreen: { count: number };
  InvoicesScreen: undefined;
  VoucherEntryStartScreen: undefined;
  VoucherEntryNavigator: undefined;
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  ContactUsScreen: undefined;
};

export type VoucherEntryNavigationProps = {
  navigate: (to: string, props?: unknown) => void;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;

export type ScannerStackScreenProps<T extends keyof ScannerStackParamList> =
  NativeStackScreenProps<ScannerStackParamList, T>;

export type InvoiceStackParamList = {
  InvoicesScreen: undefined;
  InvoiceDetailsScreen: { invoiceUuid: string };
};

export type InvoiceStackScreenProps<T extends keyof InvoiceStackParamList> =
  NativeStackScreenProps<InvoiceStackParamList, T>;
