import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { H2Heading } from '../../../assets/Fonts';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StandardLogo from '../../components/common/StandardLogo';
import TransactionCard from '../../components/transactions/TransactionCard';
import { getTransactionsByVendorUuid } from '../../database/queries';
import { TransactionStackScreenProps } from '../../navigation/types';
import { Transaction } from '../../types/types';
import { useAuthContext } from '../auth/AuthContext';
import { CenteredOneLine } from './styles';
import {
  CardContainer,
  SafeArea,
  StartOfListView,
  TitleContainer,
} from '../../../assets/Components';
import StandardHeader from '../../components/common/StandardHeader';
import {
  useFilterReducer,
  SortTransactionOption,
  useSortTransactionReducer,
} from '../../utils/transactionUtils';
import FilterModal from '../../components/transactions/FilterModal';
import SortModal from '../../components/transactions/SortModal';
import SortAndFilterButton from '../../components/transactions/SortAndFilterButton';

export default function TransactionsScreen({
  navigation,
}: TransactionStackScreenProps<'TransactionsScreen'>) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [defaultTransactions, setDefaultTransactions] = useState<Transaction[]>(
    [],
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const sortButtonText = ['Amount', 'Amount', 'Date', 'Date'];
  const sortDescriptionText = [
    'Amount: High to Low',
    'Amount: Low to High',
    'Date: Newest',
    'Date: Oldest',
  ];

  const [sortModalIsVisible, setSortModalIsVisible] = useState(false);
  const [filterModalIsVisible, setFilterModalIsVisible] = useState(false);
  const [minDatePickerIsVisible, setMinDatePickerIsVisible] = useState(false);
  const [maxDatePickerIsVisible, setMaxDatePickerIsVisible] = useState(false);

  const { vendorUuid } = useAuthContext();

  const { sortTransactionState, sortTransactionDispatch } =
    useSortTransactionReducer(transactions, setTransactions);
  const { filterState, filterDispatch } = useFilterReducer(
    defaultTransactions,
    setTransactions,
  );

  const fetchData = async (Uuid: string | null) => {
    try {
      if (Uuid) {
        const transactionsArray = await getTransactionsByVendorUuid(Uuid);
        setDefaultTransactions(transactionsArray);
        setTransactions(transactionsArray);
        setIsLoading(false);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('(useEffect)[TransactionsScreen]', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
    fetchData(vendorUuid).then(() => {
      filterDispatch({ type: 'ON_RELOAD' });
      sortTransactionDispatch({ type: 'ON_RELOAD' });
    });
  }, [vendorUuid, sortTransactionDispatch, filterDispatch]);

  useEffect(() => {
    fetchData(vendorUuid).then(() => {
      filterDispatch({ type: 'ON_RELOAD' });
      sortTransactionDispatch({ type: 'ON_RELOAD' });
    });
  }, [vendorUuid, sortTransactionDispatch, filterDispatch]);

  const sortedByDate = transactions.sort((a, b) => {
    const aTime = a.timestamp.toDate().toLocaleString();
    const bTime = b.timestamp.toDate().toLocaleString();
    return aTime.localeCompare(bTime);
  });

  return (
    <SafeArea>
      <StandardHeader>
        <StandardLogo />
      </StandardHeader>

      <TitleContainer>
        <H2Heading>Invoices</H2Heading>
      </TitleContainer>

      <CenteredOneLine>
        <SortAndFilterButton
          modalIsVisible={sortModalIsVisible}
          setModalIsVisible={setSortModalIsVisible}
          isSelected={
            sortTransactionState.sortType !== SortTransactionOption.NO_SORT
          }
          type="sort"
          text={
            sortTransactionState.isActive
              ? `Sort by: ${sortButtonText[sortTransactionState.sortType]}`
              : 'Sort by'
          }
        />

        <SortAndFilterButton
          modalIsVisible={filterModalIsVisible}
          setModalIsVisible={setFilterModalIsVisible}
          isSelected={filterState.filterCount > 0}
          type="filter"
          text={`Filter (${filterState.filterCount})`}
        />
      </CenteredOneLine>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <CardContainer>
          <StartOfListView />
          <FlatList
            data={sortedByDate}
            renderItem={({ item }) => (
              <TransactionCard
                navigation={navigation}
                id={item.uuid}
                date={item.timestamp.toDate()}
                value={item.value}
                status={item.status}
              />
            )}
            keyExtractor={item => item.uuid}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        </CardContainer>
      )}

      <SortModal
        name="invoices"
        isVisible={sortModalIsVisible}
        setIsVisible={setSortModalIsVisible}
        sortDescriptions={sortDescriptionText}
        sortState={sortTransactionState}
        sortDispatch={sortTransactionDispatch}
      />

      <FilterModal
        filterState={filterState}
        filterDispatch={filterDispatch}
        sortDispatch={sortTransactionDispatch}
        isVisible={filterModalIsVisible}
        setIsVisible={setFilterModalIsVisible}
        minDatePickerIsVisible={minDatePickerIsVisible}
        setMinDatePickerIsVisible={setMinDatePickerIsVisible}
        maxDatePickerIsVisible={maxDatePickerIsVisible}
        setMaxDatePickerIsVisible={setMaxDatePickerIsVisible}
      />
    </SafeArea>
  );
}
