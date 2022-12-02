import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { TransactionCard } from '../../components/Transactions/TransactionCard';
import { H2Heading } from '../../../assets/Fonts';
import {
  TransactionsContainer,
  FilterRow,
  AddManuallyContainer,
  Title,
  HorizontalSpacingContainer,
  CardContainer,
} from './styles';

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState([
    {
      id: '123123',
      date: '10/22/22 8:29AM PST',
      count: 4,
      price: 10.43,
      status: 'paid',
    },
    {
      id: '473844',
      date: '10/19/22 3:12PM PST',
      count: 10,
      price: 37.21,
      status: 'paid',
    },
    {
      id: '123827',
      date: '10/10/22 4:55AM PST',
      count: 2,
      price: 5.42,
      status: 'unpaid',
    },
    {
      id: '234724',
      date: '10/07/22 2:49AM PST',
      count: 1,
      price: 11.22,
      status: 'paid',
    },
    {
      id: '198343',
      date: '10/05/22 6:52PM PST',
      count: 12,
      price: 3.24,
      status: 'unpaid',
    },
    {
      id: '127428',
      date: '10/01/22 1:29PM PST',
      count: 3,
      price: 7.29,
      status: 'unpaid',
    },
    {
      id: '127428',
      date: '10/01/22 1:29PM PST',
      count: 3,
      price: 7.29,
      status: 'unpaid',
    },
  ]);

  return (
    <TransactionsContainer>
      <AddManuallyContainer>
        <Button title="Add manually" />
      </AddManuallyContainer>

      <Title>
        <H2Heading>Transactions</H2Heading>
      </Title>

      <FilterRow>
        <View
          style={{
            backgroundColor: '#000000',
            padding: 2,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF' }}>
            ------ Search bar placeholder :P ------
          </Text>
        </View>
        <HorizontalSpacingContainer>
          <Button title="Filter" />
        </HorizontalSpacingContainer>
      </FilterRow>

      <CardContainer>
        {transactions.map(item => (
          <TransactionCard
            key={item.id}
            id={item.id}
            date={item.date}
            count={item.count}
            price={item.price}
            status={item.status}
          />
        ))}
      </CardContainer>
    </TransactionsContainer>
  );
};

export default TransactionsScreen;
