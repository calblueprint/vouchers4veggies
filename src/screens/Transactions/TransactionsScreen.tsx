import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { H2Heading } from '../../../assets/Fonts';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StandardLogo from '../../components/common/StandardLogo';
import TransactionCard from '../../components/Transactions/TransactionCard';
import { getTransactionsByVendorUuid } from '../../database/queries';
import { TransactionStackScreenProps } from '../../navigation/types';
import { Transaction } from '../../types/types';
import { useAuthContext } from '../auth/AuthContext';
import StandardHeader from '../../components/common/StandardHeader';
import {
  TransactionsContainer,
  TitleContainer,
  CardContainer,
  StartOfListView,
} from './styles';

export default function TransactionsScreen({
  navigation,
}: TransactionStackScreenProps<'TransactionsScreen'>) {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { vendorUuid } = useAuthContext();

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
        <H2Heading>Transactions</H2Heading>
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
          />
        </CardContainer>
      )}
    </TransactionsContainer>
  );
}
