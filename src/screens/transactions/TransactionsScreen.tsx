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
import { TitleContainer } from './styles';
import {
  CardContainer,
  SafeArea,
  StartOfListView,
} from '../../../assets/Components';
import StandardHeader from '../../components/common/StandardHeader';

export default function TransactionsScreen({
  navigation,
}: TransactionStackScreenProps<'TransactionsScreen'>) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sort, setSort] = useState('DateDesc');
  const { vendorUuid } = useAuthContext();

  const sortTransactionsByAmountAsc = () => {
    const sortedArray = transactions?.sort((a, b) => a.value - b.value);
    setTransactions(sortedArray);
  };

  const sortTransactionsByAmountDesc = () => {
    const sortedArray = transactions?.sort((a, b) => b.value - a.value);
    setTransactions(sortedArray);
  };

  const sortTransactionsByDateAsc = () => {
    const sortedArray = transactions?.sort(
      (a, b) => a.timestamp.seconds - b.timestamp.seconds,
    );
    setTransactions(sortedArray);
  };

  const sortTransactionsByDateDesc = () => {
    const sortedArray = transactions?.sort(
      (a, b) => b.timestamp.seconds - a.timestamp.seconds,
    );
    setTransactions(sortedArray);
  };

  const fetchData = async (Uuid: string | null) => {
    try {
      if (Uuid) {
        const transactionsArray = await getTransactionsByVendorUuid(Uuid);
        setTransactions(transactionsArray);
        setIsLoading(false);

        switch (sort) {
          case 'AmountAsc':
            sortTransactionsByAmountAsc();
            break;
          case 'AmountDesc':
            sortTransactionsByAmountDesc();
            break;
          case 'DateAsc':
            sortTransactionsByDateAsc();
            break;
          case 'DateDesc':
            sortTransactionsByDateDesc();
            break;
          default:
            sortTransactionsByDateAsc();
        }
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
  }, [vendorUuid]);

  return (
    <SafeArea>
      <StandardHeader>
        <StandardLogo />
      </StandardHeader>

      <TitleContainer>
        <H2Heading>Invoices</H2Heading>
      </TitleContainer>

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
    </SafeArea>
  );
}
