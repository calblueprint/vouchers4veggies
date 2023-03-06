import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../../assets/Colors';
import { RootNavBackButton } from '../../../assets/Components';
import { H2Heading } from '../../../assets/Fonts';
import StandardLogo from '../../components/common/StandardLogo';
import StatusComponent from '../../components/Transactions/StatusComponent';
import TransactionCard from '../../components/Transactions/TransactionCard';
import VoucherCard from '../../components/Transactions/VoucherCard';
import {
  getTransaction,
  getTransactionsByVendorUuid,
  getVoucher,
} from '../../database/queries';
import { TransactionStackScreenProps } from '../../navigation/types';
import { Transaction, Voucher } from '../../types/types';
import {
  Title,
  LogoContainer,
  TransactionsContainer,
  TitleContainer,
  CardContainer,
  LeftAlignedContainer,
  DarkGrayText,
  MediumText,
  Body1BoldText,
  BackButtonContainer,
} from './styles';

export default function TransactionDetailsScreen({
  route,
  navigation,
}: TransactionStackScreenProps<'TransactionDetailsScreen'>) {
  const { transactionUuid } = route.params;
  const [transactionData, setTransactionData] = useState<Transaction>();
  const [voucherArray, setVoucherArray] = useState<Voucher[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransaction(transactionUuid);
        setTransactionData(data);

        const voucherData = await Promise.all(
          data.voucherSerialNumbers.map(async item => {
            const v = await getVoucher(item);
            return v;
          }),
        );
        setVoucherArray(voucherData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('(useEffect)[TransactionDetailsScreen]', error);
      }
    };
    fetchData();
  });

  return (
    <TransactionsContainer>
      <BackButtonContainer>
        <RootNavBackButton
          onPress={() => navigation.navigate('TransactionsScreen')}
        >
          <DarkGrayText>
            <Icon name="left" size={14} color={Colors.darkGray} /> Back
          </DarkGrayText>
        </RootNavBackButton>
      </BackButtonContainer>

      {transactionData ? (
        <TransactionsContainer>
          <StatusComponent status={transactionData.status} />
          <Title>${transactionData.value / 100}</Title>
          <MediumText>
            Date:
            {` ${transactionData.timestamp
              .toDate()
              .toLocaleString('en-US', { dateStyle: 'short' })}`}
          </MediumText>
          <MediumText>
            Time:
            {` ${transactionData.timestamp
              .toDate()
              .toLocaleString('en-US', { timeStyle: 'short' })}`}
          </MediumText>

          <LeftAlignedContainer>
            <Body1BoldText>
              Count: {transactionData.voucherSerialNumbers.length}
            </Body1BoldText>
          </LeftAlignedContainer>

          <CardContainer>
            {voucherArray?.map(item => (
              <VoucherCard
                key={item.serialNumber}
                serialNumber={item.serialNumber}
                value={item.value}
              />
            ))}
          </CardContainer>
        </TransactionsContainer>
      ) : null}
    </TransactionsContainer>
  );
}
