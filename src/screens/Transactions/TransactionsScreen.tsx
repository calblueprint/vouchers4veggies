import React, { useEffect, useState } from 'react';
import { H2Heading } from '../../../assets/Fonts';
import StandardLogo from '../../components/common/StandardLogo';
import TransactionCard from '../../components/Transactions/TransactionCard';
import { getTransactionsByVendorUuid } from '../../database/queries';
import { TransactionStackScreenProps } from '../../navigation/types';
import { Transaction } from '../../types/types';
import {
  LogoContainer,
  TransactionsContainer,
  Title,
  CardContainer,
} from './styles';

export default function TransactionsScreen({
  navigation,
}: TransactionStackScreenProps<'TransactionsScreen'>) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // to do: retrieve vendor uuid
        const transactionsArray = await getTransactionsByVendorUuid('abc');
        setTransactions(transactionsArray);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('(useEffect)[TransactionsScreen]', error);
      }
    };
    fetchData();
  }, []);

  return (
    <TransactionsContainer>
      <LogoContainer>
        <StandardLogo />
      </LogoContainer>

      <Title>
        <H2Heading>Transactions</H2Heading>
      </Title>

      <CardContainer>
        {transactions.map(item => (
          <TransactionCard
            key={item.uuid}
            navigation={navigation}
            id={item.uuid}
            date={item.timestamp.toDate()}
            value={item.value}
            status={item.status}
          />
        ))}
      </CardContainer>
    </TransactionsContainer>
  );
}
