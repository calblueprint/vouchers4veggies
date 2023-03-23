import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../../assets/Colors';
import { RootNavBackButton } from '../../../assets/Components';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusComponent from '../../components/transactions/StatusComponent';
import VoucherCard from '../../components/transactions/VoucherCard';
import { getTransaction, getVoucher } from '../../database/queries';
import { TransactionStackScreenProps } from '../../navigation/types';
import { Transaction, Voucher } from '../../types/types';
import StandardHeader from '../../components/common/StandardHeader';
import {
  formatTimeForDisplay,
  formatValueForDisplay,
} from '../../utils/displayUtils';
import {
  BackButtonContainer,
  CardContainer,
  DarkGrayText,
  LeftAlignedContainer,
  MediumText,
  Size14BoldText,
  StartOfListView,
  Title,
  TransactionsContainer,
} from './styles';

export default function TransactionDetailsScreen({
  route,
  navigation,
}: TransactionStackScreenProps<'TransactionDetailsScreen'>) {
  const { transactionUuid } = route.params;
  const [transactionData, setTransactionData] = useState<Transaction>();
  const [voucherArray, setVoucherArray] = useState<Voucher[]>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

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
      <StandardHeader>
        <BackButtonContainer>
          <RootNavBackButton
            onPress={() => navigation.navigate('TransactionsScreen')}
          >
            <DarkGrayText>
              <Icon name="left" size={14} color={Colors.darkGray} /> Back
            </DarkGrayText>
          </RootNavBackButton>
        </BackButtonContainer>
      </StandardHeader>

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
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          </CardContainer>
        </TransactionsContainer>
      ) : (
        <LoadingSpinner />
      )}
    </TransactionsContainer>
  );
}
