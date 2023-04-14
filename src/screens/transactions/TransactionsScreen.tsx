import React, { useEffect, useReducer, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Body2Subtext, H2Heading, MagentaText } from '../../../assets/Fonts';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StandardLogo from '../../components/common/StandardLogo';
import TransactionCard from '../../components/transactions/TransactionCard';
import { getTransactionsByVendorUuid } from '../../database/queries';
import { TransactionStackScreenProps } from '../../navigation/types';
import { Transaction, TransactionStatus } from '../../types/types';
import { useAuthContext } from '../auth/AuthContext';
import { CenteredOneLine, TitleContainer } from './styles';
import {
  CardContainer,
  SafeArea,
  StartOfListView,
} from '../../../assets/Components';
import StandardHeader from '../../components/common/StandardHeader';
import Colors from '../../../assets/Colors';
import { FilterState, useFilterReducer } from '../../utils/filterUtils';
import FilterModal from '../../components/transactions/FilterModal';
import SortModal from '../../components/transactions/SortModal';
import SortAndFilterButton from '../../components/transactions/SortAndFilterButton';
import { SortOption, SortState, useSortReducer } from '../../utils/sortUtils';

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
    ' Amount: High to Low',
    ' Amount: Low to High',
    ' Date: Newest',
    ' Date: Oldest',
  ];

  const [sortModalIsVisible, setSortModalIsVisible] = useState(false);
  const [filterModalIsVisible, setFilterModalIsVisible] = useState(false);
  const [minDatePickerIsVisible, setMinDatePickerIsVisible] = useState(false);
  const [maxDatePickerIsVisible, setMaxDatePickerIsVisible] = useState(false);

  const { vendorUuid } = useAuthContext();

  const { sortState, sortDispatch } = useSortReducer(
    transactions,
    setTransactions,
  );
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
    fetchData(vendorUuid);
  }, [vendorUuid]);

  useEffect(() => {
    fetchData(vendorUuid);
    sortDispatch({ type: 'ON_RELOAD' });
    console.log(sortState.sortType);
  }, [vendorUuid, sortState.sortType, sortDispatch]);

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
          isSelected={sortState.sortType !== SortOption.NO_SORT}
          type="sort"
          text={`Sort by: ${sortButtonText[sortState.sortType]}`}
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
            data={transactions}
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
        isVisible={sortModalIsVisible}
        setIsVisible={setSortModalIsVisible}
        sortDescriptions={sortDescriptionText}
        sortState={sortState}
        sortDispatch={sortDispatch}
      />

      <FilterModal
        filterState={filterState}
        filterDispatch={filterDispatch}
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
