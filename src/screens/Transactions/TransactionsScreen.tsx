import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { H2Heading } from '../../../assets/Fonts';
import TransactionCard from '../../components/Transactions/TransactionCard';
import {
  LogoContainer,
  TransactionsContainer,
  FilterRow,
  Title,
  HorizontalSpacingContainer,
  CardContainer,
} from './styles';
import Dropdown from '../../components/Dropdown/Dropdown';
// import { DropdownButton } from '../../components/Dropdown/DropdownButton';

export default function TransactionsScreen() {
  const onChange = () => {
    const a = 2;
  };
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
      id: '127458',
      date: '10/01/22 1:29PM PST',
      count: 3,
      price: 7.99,
      status: 'unpaid',
    },
  ]);

  const countMenu = [
    { label: '1-10', value: '1' },
    { label: '11-20', value: '2' },
    { label: '21+', value: '3' },
  ];

  return (
    <TransactionsContainer>
      <LogoContainer>
        <View style={{ backgroundColor: 'black', width: 50, height: 59.29 }}>
          <Text style={{ color: 'white' }}>{`\n  Logo`}</Text>
        </View>
      </LogoContainer>

      <Title>
        <H2Heading>Transactions</H2Heading>
      </Title>

      <FilterRow>
        <Dropdown
          label="Count"
          data={countMenu}
          onSelect={onChange}
          // dropdownPosition="bottom"
        />
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
}
