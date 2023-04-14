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
import {
  CenteredOneLine,
  SortAndFilterButton,
  Styles,
  TitleContainer,
} from './styles';
import {
  CardContainer,
  SafeArea,
  StartOfListView,
} from '../../../assets/Components';
import StandardHeader from '../../components/common/StandardHeader';
import Colors from '../../../assets/Colors';
import {
  FilterState,
  SortState,
  useFilterReducer,
} from './TransactionsContext';
import FilterModal from '../../components/transactions/FilterModal';
import SortModal from '../../components/transactions/SortModal';

export default function TransactionsScreen({
  navigation,
}: TransactionStackScreenProps<'TransactionsScreen'>) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [defaultTransactions, setDefaultTransactions] = useState<Transaction[]>(
    [],
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [sortType, setSortType] = useState(-1);
  const sortOptions = [
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

  const filterByDate = (filterState: FilterState) => {
    let minTime = 0;
    if (filterState.minDateIsSet) {
      minTime = filterState.minDate.getTime();
    }
    const filteredArray = defaultTransactions?.filter(
      t =>
        t.timestamp.seconds * 1000 >= minTime &&
        t.timestamp.seconds * 1000 <= filterState.maxDate.getTime(),
    );
    setTransactions(filteredArray);
  };

  const filterByPaid = () => {
    const filteredArray = defaultTransactions?.filter(
      t => t.status === TransactionStatus.PAID,
    );
    setTransactions(filteredArray);
  };

  const filterByUnpaid = () => {
    const filteredArray = defaultTransactions?.filter(
      t => t.status === TransactionStatus.UNPAID,
    );
    setTransactions(filteredArray);
  };

  const filterByAmount = () => {
    // const filteredArray = defaultTransactions?.filter(
    //   t => t.value >= filterMin && t.value <= filterMax,
    // );
    // setTransactions(filteredArray);
  };

  const sortTransactionsByAmountDesc = (data: Transaction[]) => {
    const sortedArray = data.sort((a, b) => b.value - a.value);
    return sortedArray;
  };

  const sortTransactionsByAmountAsc = (data: Transaction[]) => {
    const sortedArray = data.sort((a, b) => a.value - b.value);
    return sortedArray;
  };

  const sortTransactionsByDateDesc = (data: Transaction[]) => {
    const sortedArray = data.sort(
      (a, b) => b.timestamp.seconds - a.timestamp.seconds,
    );
    return sortedArray;
  };

  const sortTransactionsByDateAsc = (data: Transaction[]) => {
    const sortedArray = data.sort(
      (a, b) => a.timestamp.seconds - b.timestamp.seconds,
    );
    return sortedArray;
  };

  const useSortReducer = () =>
    useReducer(
      (prevState: SortState, sort: number): SortState => {
        switch (sort) {
          case -2:
            // return { ...prevState, sortedArray: transactions };
            return { ...prevState, sortedArray: defaultTransactions };
          case 0:
            return {
              ...prevState,
              sortedArray: sortTransactionsByAmountDesc(prevState.sortedArray),
            };
          case 1:
            return {
              ...prevState,
              sortedArray: sortTransactionsByAmountAsc(prevState.sortedArray),
            };
          case 2:
            return {
              ...prevState,
              sortedArray: sortTransactionsByDateDesc(prevState.sortedArray),
            };
          case 3:
            return {
              ...prevState,
              sortedArray: sortTransactionsByDateAsc(prevState.sortedArray),
            };
          default:
            return {
              ...prevState,
              sortedArray: sortTransactionsByAmountDesc(prevState.sortedArray),
            };
        }
      },
      {
        sortedArray: defaultTransactions,
        dispatch: () => null,
      },
    );

  const [sortState, sortDispatch] = useSortReducer();
  const [filterState, filterDispatch] = useFilterReducer();

  const fetchData = async (Uuid: string | null) => {
    try {
      if (Uuid) {
        const transactionsArray = await getTransactionsByVendorUuid(Uuid);
        setDefaultTransactions(transactionsArray);
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
    // switch (filter) {
    //   case 'Date':
    //     filterByDate();
    //     break;
    //   case 'Paid':
    //     filterByPaid();
    //     break;
    //   case 'Unpaid':
    //     filterByUnpaid();
    //     break;
    //   case 'Amount':
    //     filterByAmount();
    //     break;
    //   default:
    //     break;
    // }

    // sortDispatch(sortType);
    // setTransactions(defaultTransactions);
    // sortDispatch(-2);
    sortDispatch(-2);
    sortDispatch(sortType);
    setTransactions(sortState.sortedArray);
    console.log(sortType);
  }, [vendorUuid, sortType, sortDispatch, sortState.sortedArray]);

  return (
    <SafeArea>
      <StandardHeader>
        <StandardLogo />
      </StandardHeader>

      <TitleContainer>
        <H2Heading>Invoices</H2Heading>
      </TitleContainer>

      <CenteredOneLine>
        <SortAndFilterButton onPress={() => setSortModalIsVisible(true)}>
          {sortType >= 0 ? (
            <CenteredOneLine>
              <Octicons
                name="sort-desc"
                size={16}
                color={Colors.magenta}
                style={Styles.icon}
              />
              <MagentaText>
                <Body2Subtext>{`Sort by ${sortOptions[sortType]}`}</Body2Subtext>
              </MagentaText>
            </CenteredOneLine>
          ) : (
            <CenteredOneLine>
              <Octicons
                name="sort-desc"
                size={16}
                color={Colors.midBlack}
                style={Styles.icon}
              />
              <Body2Subtext>Sort by</Body2Subtext>
            </CenteredOneLine>
          )}
        </SortAndFilterButton>

        <SortAndFilterButton onPress={() => setFilterModalIsVisible(true)}>
          {filterState.filterCount > 0 ? (
            <CenteredOneLine>
              <MaterialIcons
                name="tune"
                size={16}
                color={Colors.magenta}
                style={Styles.icon}
              />
              <MagentaText>
                <Body2Subtext>{`Filter (${filterState.filterCount})`}</Body2Subtext>
              </MagentaText>
            </CenteredOneLine>
          ) : (
            <CenteredOneLine>
              <MaterialIcons
                name="tune"
                size={16}
                color={Colors.midBlack}
                style={Styles.icon}
              />
              <Body2Subtext>{`Filter (${filterState.filterCount})`}</Body2Subtext>
            </CenteredOneLine>
          )}
        </SortAndFilterButton>
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
        sortType={sortType}
        setSortType={setSortType}
        sortOptions={sortOptions}
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
