import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import {
  CardContainer,
  CenteredRow,
  SafeArea,
  StartOfListView,
} from '../../../assets/Components';
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
import BodyContainer from './styles';
import {
  SortVoucherOption,
  useSortReducer,
} from '../../utils/transactionUtils';
import SortModal from '../../components/transactions/SortModal';
import SortAndFilterButton from '../../components/transactions/SortAndFilterButton';
import {
  Body1TextSemibold,
  H5Subheading,
  TitleText,
} from '../../../assets/Fonts';

const sortButtonText = ['SN', 'SN', 'Date', 'Date'];
const sortDescriptionText = [
  'Serial Number: High to Low',
  'Serial Number: Low to High',
  'Date: Newest',
  'Date: Oldest',
];

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

  const onPressBackButton = () => navigation.goBack();

  return (
    <SafeArea>
      <StandardHeader>
        <BackButton onPress={onPressBackButton} />
      </StandardHeader>

      {transactionData ? (
        <>
          <StatusComponent status={transactionData.status} />
          <TitleText>${formatValueForDisplay(transactionData.value)}</TitleText>
          <H5Subheading>Date: {time.format('M/D/YY')}</H5Subheading>
          <H5Subheading>Time: {formatTimeForDisplay(time)}</H5Subheading>

          <BodyContainer>
            <Body1TextSemibold>
              Count: {transactionData.voucherSerialNumbers.length}
            </Body1TextSemibold>
          </BodyContainer>

          <BodyContainer>
            <CenteredRow>
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
                width="100%"
              />
            </CenteredRow>
          </BodyContainer>

          <CardContainer>
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
          </CardContainer>
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
