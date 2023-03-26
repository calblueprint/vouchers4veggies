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
import { TransactionsContainer, TitleContainer } from './styles';
import { CardContainer, StartOfListView } from '../../../assets/Components';
import StandardHeader from '../../components/common/StandardHeader';

export default function TransactionsScreen({
  navigation,
}: TransactionStackScreenProps<'TransactionsScreen'>) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { vendorUuid } = useAuthContext();

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (vendorUuid) {
          const transactionsArray = await getTransactionsByVendorUuid(
            vendorUuid,
          );
          setTransactions(transactionsArray);
          setIsLoading(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('(useEffect)[TransactionsScreen]', error);
      }
    };
    fetchData();
  }, [vendorUuid]);

  return (
    <TransactionsContainer>
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
    </TransactionsContainer>
  );
}
