import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../../assets/Colors';
import { RootNavBackButton } from '../../../assets/Components';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusComponent from '../../components/Transactions/StatusComponent';
import VoucherCard from '../../components/Transactions/VoucherCard';
import { getTransaction, getVoucher } from '../../database/queries';
import { TransactionStackScreenProps } from '../../navigation/types';
import { Transaction, Voucher } from '../../types/types';
import {
  formatTimeForDisplay,
  formatValueForDisplay,
} from '../../utils/displayUtils';
import {
  Title,
  TransactionsContainer,
  LeftAlignedContainer,
  DarkGrayText,
  MediumText,
  BackButtonContainer,
  CardContainer,
  StartOfListView,
  Size14BoldText,
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
          data.voucherSerialNumbers.map(item => getVoucher(item)),
        );
        setVoucherArray(voucherData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('(useEffect)[TransactionDetailsScreen]', error);
      }
    };
    fetchData();
  }, [transactionUuid]);

  const time = moment(transactionData?.timestamp.toDate());

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
          <Title>${formatValueForDisplay(transactionData.value)}</Title>
          <MediumText>Date: {time.format('M/D/YY')}</MediumText>
          <MediumText>Time: {formatTimeForDisplay(time)}</MediumText>

          <LeftAlignedContainer>
            <Size14BoldText>
              Count: {transactionData.voucherSerialNumbers.length}
            </Size14BoldText>
          </LeftAlignedContainer>

          <CardContainer>
            <StartOfListView />
            <FlatList
              data={voucherArray}
              renderItem={({ item }) => (
                <VoucherCard
                  serialNumber={item.serialNumber}
                  value={item.value}
                />
              )}
              keyExtractor={item => item.serialNumber.toString()}
            />
          </CardContainer>
        </TransactionsContainer>
      ) : (
        <LoadingSpinner />
      )}
    </TransactionsContainer>
  );
}
