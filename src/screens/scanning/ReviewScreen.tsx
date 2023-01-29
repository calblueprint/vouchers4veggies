import React, { useState } from 'react';
import { View } from 'react-native';
import { Colors } from '../../../assets/Colors';
import {
  H2Heading,
  Body_1_Text,
  ButtonTextWhite,
  H3_Subheading,
  LabelText,
} from '../../../assets/Fonts';
import {
  PageContainer,
  ReviewContainer,
  ReviewHeader,
  AggregateContainer,
  SafeArea,
} from './styles';
import VoucherCard from '../../components/VoucherReview/VoucherCard';
import { Ionicons } from '@expo/vector-icons';
import { ButtonMagenta } from '../../../assets/Components';

//TODO: add props to store voucher
const ReviewScreen = () => {
  // TODO: onSubmit function to create new transaction for vendor
  const [vouchers, setVouchers] = useState([
    {
      id: '1000001',
      date: '10/15/22 09:24PM ',
      amount: '10.45',
    },
    {
      id: '1000002',
      date: '10/15/22 09:25PM ',
      amount: '10.45',
    },
    {
      id: '1000003',
      date: '10/15/22 09:26PM ',
      amount: '10.45',
    },
    {
      id: '1000004',
      date: '10/15/22 09:26PM ',
      amount: '10.45',
    },
    {
      id: '1000005',
      date: '10/15/22 09:27PM ',
      amount: '10.45',
    },
  ]);
  return (
    <SafeArea>
      <PageContainer>
        <ReviewHeader>
          <Ionicons name="chevron-back" size={25} color={Colors.darkGray} />
          <Body_1_Text>Back</Body_1_Text>
        </ReviewHeader>
        <H2Heading style={{ marginBottom: '3%' }}>Review Vouchers</H2Heading>
        {/* Make this container scrollable */}
        <ReviewContainer>
          {vouchers.map(item => (
            <VoucherCard
              key={item.id}
              id={item.id}
              date={item.date}
              amount={item.amount}
            />
          ))}
        </ReviewContainer>
        <AggregateContainer>
          <LabelText>Amount</LabelText>
          <H3_Subheading>x{vouchers.length}</H3_Subheading>
        </AggregateContainer>
        <AggregateContainer>
          <LabelText>Total</LabelText>
          <H3_Subheading>$31.45</H3_Subheading>
        </AggregateContainer>
        <View style={{ marginTop: '3%' }}>
          <ButtonMagenta>
            <ButtonTextWhite>Submit</ButtonTextWhite>
          </ButtonMagenta>
        </View>
      </PageContainer>
    </SafeArea>
  );
};

export default ReviewScreen;
