import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { SafeArea, StartOfListView } from '../../../assets/Components';
import BackButton from '../../components/common/BackButton';
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
  CenteredOneLine,
  CountContainer,
  MediumText,
  Size14BoldText,
  Title,
} from './styles';
import {
  SortVoucherOption,
  useSortReducer,
} from '../../utils/transactionUtils';
import SortModal from '../../components/transactions/SortModal';
import SortAndFilterButton from '../../components/transactions/SortAndFilterButton';

export default function TransactionDetailsScreen({
  route,
  navigation,
}: TransactionStackScreenProps<'TransactionDetailsScreen'>) {
  const { transactionUuid } = route.params;
  const [transactionData, setTransactionData] = useState<Transaction>();
  const [defaultVoucherArray, setDefaultVoucherArray] = useState<Voucher[]>([]);
  const [displayedVoucherArray, setDisplayedVoucherArray] = useState<Voucher[]>(
    [],
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [sortModalIsVisible, setSortModalIsVisible] = useState(false);
  const { sortState, sortDispatch } = useSortReducer(
    'vouchers',
    displayedVoucherArray,
    defaultVoucherArray,
    setDisplayedVoucherArray,
  );

  const sortButtonText = ['SN', 'SN', 'Date', 'Date'];
  const sortDescriptionText = [
    'Serial Number: High to Low',
    'Serial Number: Low to High',
    'Date: Newest',
    'Date: Oldest',
  ];

  const fetchData = async (Uuid: string | null) => {
    try {
      if (Uuid) {
        const data = await getTransaction(Uuid);
        setTransactionData(data);

        const voucherData = await Promise.all(
          data.voucherSerialNumbers.map(item => getVoucher(item)),
        );
        setDefaultVoucherArray(voucherData);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('(useEffect)[TransactionDetailsScreen]', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
    fetchData(transactionUuid).then(() => {
      sortDispatch({ type: 'ON_RELOAD' });
    });
  }, [transactionUuid, sortDispatch]);

  useEffect(() => {
    fetchData(transactionUuid).then(() => {
      sortDispatch({ type: 'ON_RELOAD' });
    });
  }, [transactionUuid, sortDispatch]);

  const time = moment(transactionData?.timestamp.toDate());

  return (
    <SafeArea>
      <StandardHeader>
        <BackButton onPress={() => navigation.goBack()} />
      </StandardHeader>

      {transactionData ? (
        <>
          <StatusComponent status={transactionData.status} />
          <Title>${formatValueForDisplay(transactionData.value)}</Title>
          <MediumText>Date: {time.format('M/D/YY')}</MediumText>
          <MediumText>Time: {formatTimeForDisplay(time)}</MediumText>

          <CountContainer>
            <Size14BoldText>
              Count: {transactionData.voucherSerialNumbers.length}
            </Size14BoldText>
          </CountContainer>

          <CenteredOneLine style={{ paddingHorizontal: 22 }}>
            <SortAndFilterButton
              modalIsVisible={sortModalIsVisible}
              setModalIsVisible={setSortModalIsVisible}
              isSelected={sortState.sortType !== SortVoucherOption.NO_SORT}
              type="sort"
              text={
                sortState.isActive
                  ? `Sort by: ${sortButtonText[sortState.sortType]}`
                  : 'Sort by'
              }
              style={{ width: '100%' }}
            />
          </CenteredOneLine>

          <>
            <StartOfListView />
            <FlatList
              data={displayedVoucherArray}
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
          </>
        </>
      ) : (
        <LoadingSpinner />
      )}

      <SortModal
        name="vouchers"
        isVisible={sortModalIsVisible}
        setIsVisible={setSortModalIsVisible}
        sortDescriptions={sortDescriptionText}
        sortState={sortState}
        sortDispatch={sortDispatch}
      />
    </SafeArea>
  );
}
