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
  Transactions: undefined;
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
  MaterialBottomTabNavigationProp<BottomTabParamList, T>;

export type ScannerStackParamList = {
  ScanningScreen: undefined;
  ManualVoucherScreen: undefined;
  ConfirmValueScreen: { serialNumber: number };
  ReviewScreen: undefined;
  ConfirmationScreen: undefined;
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;

export type ScannerStackScreenProps<T extends keyof ScannerStackParamList> =
  NativeStackScreenProps<ScannerStackParamList, T>;

export type TransactionStackParamList = {
  TransactionsScreen: undefined;
  TransactionDetailsScreen: { transactionUuid: string };
};

export type TransactionStackScreenProps<
  T extends keyof TransactionStackParamList,
> = NativeStackScreenProps<TransactionStackParamList, T>;
