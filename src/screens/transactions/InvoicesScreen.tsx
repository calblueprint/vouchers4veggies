import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { H2Heading } from '../../../assets/Fonts';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StandardLogo from '../../components/common/StandardLogo';
import InvoiceCard from '../../components/transactions/TransactionCard';
import { getInvoicesByVendorUuid } from '../../database/queries';
import { InvoiceStackScreenProps } from '../../navigation/types';
import { Invoice } from '../../types/types';
import { useAuthContext } from '../auth/AuthContext';
import {
  CardContainer,
  CenteredRow,
  SafeArea,
  StartOfListView,
  TitleContainer,
} from '../../../assets/Components';
import StandardHeader from '../../components/common/StandardHeader';
import {
  useFilterReducer,
  SortInvoiceOption,
  useSortReducer,
} from '../../utils/invoiceUtils';
import FilterModal from '../../components/transactions/FilterModal';
import SortModal from '../../components/transactions/SortModal';
import SortAndFilterButton from '../../components/transactions/SortAndFilterButton';

const sortButtonText = ['Amount', 'Amount', 'Date', 'Date'];
const sortDescriptionText = [
  'Amount: High to Low',
  'Amount: Low to High',
  'Date: Newest',
  'Date: Oldest',
];

export default function InvoicesScreen({
  navigation,
}: InvoiceStackScreenProps<'InvoicesScreen'>) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [defaultTransactions, setDefaultTransactions] = useState<Invoice[]>([]);
  const [transactions, setTransactions] = useState<Invoice[]>([]);

  const [sortModalIsVisible, setSortModalIsVisible] = useState(false);
  const [filterModalIsVisible, setFilterModalIsVisible] = useState(false);
  const [minDatePickerIsVisible, setMinDatePickerIsVisible] = useState(false);
  const [maxDatePickerIsVisible, setMaxDatePickerIsVisible] = useState(false);

  const { vendorUuid } = useAuthContext();

  const { sortState, sortDispatch } = useSortReducer(
    'invoices',
    undefined,
    undefined,
    undefined,
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
        const transactionsArray = await getInvoicesByVendorUuid(Uuid);
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
      sortDispatch({ type: 'ON_RELOAD' });
    });
  }, [vendorUuid, sortDispatch, filterDispatch]);

  useEffect(() => {
    fetchData(vendorUuid).then(() => {
      filterDispatch({ type: 'ON_RELOAD' });
      sortDispatch({ type: 'ON_RELOAD' });
    });
  }, [vendorUuid, sortDispatch, filterDispatch]);

  return (
    <SafeArea>
      <StandardHeader>
        <StandardLogo />
      </StandardHeader>

      <TitleContainer>
        <H2Heading>Invoices</H2Heading>
      </TitleContainer>

      <CenteredRow>
        <SortAndFilterButton
          modalIsVisible={sortModalIsVisible}
          setModalIsVisible={setSortModalIsVisible}
          isSelected={sortState.sortType !== SortInvoiceOption.NO_SORT}
          type="sort"
          title={
            sortState.isActive
              ? `Sort by: ${sortButtonText[sortState.sortType]}`
              : 'Sort by'
          }
        />

        <SortAndFilterButton
          modalIsVisible={filterModalIsVisible}
          setModalIsVisible={setFilterModalIsVisible}
          isSelected={filterState.filterCount > 0}
          type="filter"
          title={`Filter (${filterState.filterCount})`}
        />
      </CenteredRow>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <CardContainer>
          <StartOfListView />
          <FlatList
            data={transactions}
            renderItem={({ item }) => (
              <InvoiceCard
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
        title="invoices"
        isVisible={sortModalIsVisible}
        setIsVisible={setSortModalIsVisible}
        sortDescriptions={sortDescriptionText}
        sortState={sortState}
        sortDispatch={sortDispatch}
      />

      <FilterModal
        filterState={filterState}
        filterDispatch={filterDispatch}
        sortDispatch={sortDispatch}
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
