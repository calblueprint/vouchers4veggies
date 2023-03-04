import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { H2Heading } from '../../../assets/Fonts';
import StandardLogo from '../../components/common/StandardLogo';
import TransactionCard from '../../components/Transactions/TransactionCard';
import {
  LogoContainer,
  TransactionsContainer,
  Title,
  HorizontalSpacingContainer,
  CardContainer,
} from './styles';

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState([
    {
      id: '123123',
      date: new Date('December 17, 2022 03:24:00'),
      value: 10.43,
      status: 'paid',
    },
    {
      id: '473844',
      date: new Date('October 17, 2022 13:22:00'),
      value: 37.21,
      status: 'paid',
    },
    {
      id: '123827',
      date: new Date('October 17, 2022 13:22:00'),
      value: 5.42,
      status: 'unpaid',
    },
    {
      id: '234724',
      date: new Date('October 17, 2022 13:22:00'),
      value: 11.22,
      status: 'paid',
    },
    {
      id: '198343',
      date: new Date('October 17, 2022 13:22:00'),
      value: 3.24,
      status: 'unpaid',
    },
    {
      id: '127428',
      date: new Date('October 17, 2022 13:22:00'),
      value: 7.29,
      status: 'unpaid',
    },
    {
      id: '127458',
      date: new Date('October 17, 2022 13:22:00'),
      value: 7.99,
      status: 'unpaid',
    },
  ]);

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
            key={item.id}
            id={item.id}
            date={item.date}
            value={item.value}
            status={item.status}
          />
        ))}
      </CardContainer>
    </TransactionsContainer>
  );
}
