import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Colors from '../../../assets/Colors';
import { H2Heading, Body1Text, ButtonTextWhite } from '../../../assets/Fonts';
import {
  PageContainer,
  ReviewContainer,
  ReviewHeader,
  ReviewScreenContainer,
} from './styles';
import { VoucherCard } from '../../components/VoucherReview/VoucherCard';
import { Ionicons } from '@expo/vector-icons';
import { ButtonMagenta } from '../../../assets/Components';

//TODO: @oahnh Figure out why voucher card doesn't render in view
const ReviewScreen = () => {
  const [vouchers, setVouchers] = useState([
    {
      id: '1000001',
      date: '10/15/22 09:24PM ',
      amount: '$10.45',
    },
    {
      id: '1000002',
      date: '10/15/22 09:25PM ',
      amount: '$10.45',
    },
    {
      id: '1000003',
      date: '10/15/22 09:26PM ',
      amount: '$10.45',
    },
    {
      id: '1000004',
      date: '10/15/22 09:26PM ',
      amount: '$10.45',
    },
    {
      id: '1000005',
      date: '10/15/22 09:27PM ',
      amount: '$10.45',
    },
  ]);
  return (
    <SafeAreaView>
      <PageContainer>
        <ReviewHeader>
          <Ionicons name="chevron-back" size={25} color={Colors.darkGray} />
          <Body1Text>Back</Body1Text>
        </ReviewHeader>
        <H2Heading style={{ marginBottom: 12 }}>Review Vouchers</H2Heading>
        {vouchers.map(item => (
          <VoucherCard
            key={item.id}
            id={item.id}
            amount={item.amount}
            date={item.date}
          />
        ))}
        <ButtonMagenta>
          <ButtonTextWhite>Submit</ButtonTextWhite>
        </ButtonMagenta>
      </PageContainer>
    </SafeAreaView>
  );
};

export default ReviewScreen;
