import React, { useEffect, useReducer, useState } from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from 'react-native-paper';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {
  BlueText,
  Body1Text,
  Body2Subtext,
  ButtonTextWhite,
  H2Heading,
  H4CardNavTab,
} from '../../../assets/Fonts';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StandardLogo from '../../components/common/StandardLogo';
import TransactionCard from '../../components/transactions/TransactionCard';
import { getTransactionsByVendorUuid } from '../../database/queries';
import { TransactionStackScreenProps } from '../../navigation/types';
import { Transaction, TransactionStatus } from '../../types/types';
import { useAuthContext } from '../auth/AuthContext';
import {
  CenteredContainer,
  SortModalTextContainer,
  OneLine,
  RightAlignContainer,
  SortAndFilterButton,
  Styles,
  TitleContainer,
  VerticalSpaceContainer,
  FilterModalTextContainer,
  DatePickerButton,
} from './styles';
import {
  ButtonMagenta,
  CardContainer,
  SafeArea,
  StartOfListView,
} from '../../../assets/Components';
import StandardHeader from '../../components/common/StandardHeader';
import RadioButton from '../../components/common/RadioButton';

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
  const [filterCount, setFilterCount] = useState(0);

  const [sortModalIsVisible, setSortModalIsVisible] = useState(false);
  const [filterModalIsVisible, setFilterModalIsVisible] = useState(false);
  const [minDatePickerIsVisible, setMinDateFilterIsVisible] = useState(false);
  const [maxDatePickerIsVisible, setMaxDateFilterIsVisible] = useState(false);
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  const [filter, setFilter] = useState('');
  const [filterMin, setFilterMin] = useState(0);
  const [filterMax, setFilterMax] = useState(0);
  const { vendorUuid } = useAuthContext();

  const filterByDate = () => {
    const filteredArray = defaultTransactions?.filter(
      t =>
        t.timestamp.seconds * 10 ** 6 >= filterMin &&
        t.timestamp.seconds * 10 ** 6 <= filterMax,
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
    const filteredArray = defaultTransactions?.filter(
      t => t.value >= filterMin && t.value <= filterMax,
    );
    setTransactions(filteredArray);
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

  type SortDispatch = React.Dispatch<number>;

  type SortState = {
    dispatch: SortDispatch;
    sortedArray: Transaction[];
  };

  const useSortReducer = () =>
    useReducer(
      (prevState: SortState, sort: number) => {
        switch (sort) {
          case -2:
            return { ...prevState, sortedArray: transactions };
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
    sortDispatch(sortType);
    setTransactions(defaultTransactions);
    sortDispatch(-2);
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

      <OneLine>
        <SortAndFilterButton onPress={() => setSortModalIsVisible(true)}>
          <OneLine>
            <Octicons
              name="sort-desc"
              size={16}
              color={Colors.black}
              style={Styles.icon}
            />
            <Body2Subtext>Sort by</Body2Subtext>
          </OneLine>
        </SortAndFilterButton>

        <SortAndFilterButton onPress={() => setFilterModalIsVisible(true)}>
          <OneLine>
            <MaterialIcons
              name="tune"
              size={16}
              color={Colors.black}
              style={Styles.icon}
            />
            <Body2Subtext>{`Filter (${filterCount})`}</Body2Subtext>
          </OneLine>
        </SortAndFilterButton>
      </OneLine>

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

      <Modal
        isVisible={sortModalIsVisible}
        coverScreen={false}
        style={Styles.modal}
      >
        <SortModalTextContainer>
          <RightAlignContainer>
            <TouchableOpacity onPress={() => setSortModalIsVisible(false)}>
              <BlueText>
                <Body1Text>Close</Body1Text>
              </BlueText>
            </TouchableOpacity>
          </RightAlignContainer>

          <VerticalSpaceContainer />
          <CenteredContainer>
            <H4CardNavTab>Sort invoices by</H4CardNavTab>
          </CenteredContainer>
          <VerticalSpaceContainer />
          <RadioButton
            data={[
              'Amount: High to Low',
              'Amount: Low to High',
              'Date: Newest',
              'Date: Oldest',
            ]}
            selected={sortType}
            setSelected={setSortType}
          />
        </SortModalTextContainer>
      </Modal>

      <Modal
        isVisible={filterModalIsVisible}
        coverScreen={false}
        style={Styles.modal}
      >
        <FilterModalTextContainer>
          <RightAlignContainer>
            <TouchableOpacity onPress={() => setFilterModalIsVisible(false)}>
              <BlueText>
                <Body1Text>Close</Body1Text>
              </BlueText>
            </TouchableOpacity>
          </RightAlignContainer>

          <VerticalSpaceContainer />

          <CenteredContainer>
            <H4CardNavTab>Filter Invoices</H4CardNavTab>
          </CenteredContainer>

          <VerticalSpaceContainer />

          <Body1Text>Filter by date</Body1Text>
          <OneLine>
            <DatePickerButton onPress={() => setMinDateFilterIsVisible(true)}>
              <Body1Text>{minDate.toDateString()}</Body1Text>
            </DatePickerButton>
            <DatePickerButton onPress={() => setMaxDateFilterIsVisible(true)}>
              <Body1Text>{maxDate.toDateString()}</Body1Text>
            </DatePickerButton>
          </OneLine>
          {minDatePickerIsVisible ? (
            <RNDateTimePicker
              value={minDate}
              onChange={e => {
                if (e.nativeEvent.timestamp) {
                  setMinDate(new Date(e.nativeEvent.timestamp));
                }
                setMinDateFilterIsVisible(false);
              }}
            />
          ) : null}
          {maxDatePickerIsVisible ? (
            <RNDateTimePicker
              value={maxDate}
              onChange={e => {
                if (e.nativeEvent.timestamp) {
                  setMaxDate(new Date(e.nativeEvent.timestamp));
                }
                setMaxDateFilterIsVisible(false);
              }}
            />
          ) : null}
          <VerticalSpaceContainer />

          <Body1Text>Filter by status</Body1Text>
          <VerticalSpaceContainer />
          <Body1Text>Filter by amount</Body1Text>
          <VerticalSpaceContainer />
          <VerticalSpaceContainer />
          <CenteredContainer>
            <ButtonMagenta>
              <ButtonTextWhite>Apply</ButtonTextWhite>
            </ButtonMagenta>
          </CenteredContainer>
        </FilterModalTextContainer>
      </Modal>
    </SafeArea>
  );
}
