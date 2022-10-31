import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { TransactionCard } from '../../components/Transactions/TransactionCard';
import { H2Heading } from '../../../assets/Fonts';
import {
  ContentContainer,
  Row,
  RightButtonContainer,
  VerticalSpacingContainer,
  HorizontalSpacingContainer,
} from './styles';

export const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState([
    { id: '123123', date: '10/22/22 8:29AM PST', count: 4, price: 10.43 },
    { id: '473844', date: '10/19/22 3:12PM PST', count: 10, price: 37.21 },
    { id: '123827', date: '10/10/22 4:55AM PST', count: 2, price: 5.42 },
    { id: '234724', date: '10/07/22 2:49AM PST', count: 1, price: 11.22 },
    { id: '198343', date: '10/05/22 6:52PM PST', count: 12, price: 3.24 },
    { id: '127428', date: '10/01/22 1:29PM PST', count: 3, price: 7.29 },
  ]);

  return (
    <ContentContainer>
      <RightButtonContainer>
        <Button title="Add manually" />
      </RightButtonContainer>

      <VerticalSpacingContainer>
        <H2Heading>Transactions</H2Heading>
      </VerticalSpacingContainer>

      <Row>
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
      </Row>

      {transactions.map(item => (
        <TransactionCard
          key={item.id}
          id={item.id}
          date={item.date}
          count={item.count}
          price={item.price}
        />
      ))}
    </ContentContainer>
  );
};
