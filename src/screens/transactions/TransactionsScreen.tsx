import React, { useEffect, useReducer, useRef, useState } from 'react';
import {
  FlatList,
  Modal,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from 'react-native-paper';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Modalize, useModalize } from 'react-native-modalize';
import {
  BlueText,
  Body1Text,
  Body2Subtext,
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
  CenteredText,
  ModalTextContainer,
  OneLine,
  RightAlignContainer,
  SortAndFilterButton,
  Styles,
  TitleContainer,
  VerticalSpaceContainer,
} from './styles';
import {
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
  const [filter, setFilter] = useState('');
  const [filterMin, setFilterMin] = useState(0);
  const [filterMax, setFilterMax] = useState(0);
  const { vendorUuid } = useAuthContext();

  const sortModalRef = useRef<Modalize>(null);
  const filterModalRef = useRef<Modalize>(null);

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
          case -1:
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
    setTransactions(defaultTransactions);
    sortDispatch(sortType);
  }, [
    vendorUuid,
    defaultTransactions,
    sortType,
    sortDispatch,
    sortState.sortedArray,
  ]);

  return (
    <SafeArea>
      <StandardHeader>
        <StandardLogo />
      </StandardHeader>

      <TitleContainer>
        <H2Heading>Invoices</H2Heading>
      </TitleContainer>

      <OneLine>
        <SortAndFilterButton
          onPress={() => {
            if (sortModalRef) {
              sortModalRef.current?.open();
            }
          }}
        >
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

        <SortAndFilterButton
          onPress={() => {
            if (filterModalRef) {
              filterModalRef.current?.open();
            }
          }}
        >
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

      <Modalize ref={sortModalRef} snapPoint={395}>
        <ModalTextContainer>
          <RightAlignContainer>
            <TouchableOpacity
              onPress={() => {
                if (sortModalRef) {
                  sortModalRef.current?.close();
                }
              }}
            >
              <BlueText>
                <Body1Text>Close</Body1Text>
              </BlueText>
            </TouchableOpacity>
          </RightAlignContainer>

          <VerticalSpaceContainer />
          <H4CardNavTab>Sort invoices by</H4CardNavTab>
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
        </ModalTextContainer>
      </Modalize>

      <Modalize ref={filterModalRef} snapPoint={510}>
        <ModalTextContainer>
          <RightAlignContainer>
            <TouchableOpacity
              onPress={() => {
                if (filterModalRef) {
                  filterModalRef.current?.close();
                }
              }}
            >
              <BlueText>
                <Body1Text>Close</Body1Text>
              </BlueText>
            </TouchableOpacity>
          </RightAlignContainer>

          <VerticalSpaceContainer />
          <CenteredText>
            <H4CardNavTab>Filter invoices</H4CardNavTab>
          </CenteredText>
          <VerticalSpaceContainer />
        </ModalTextContainer>
      </Modalize>
    </SafeArea>
  );
}
