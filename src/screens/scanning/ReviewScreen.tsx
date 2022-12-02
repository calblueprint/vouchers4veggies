import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import Colors from '../../../assets/Colors';
import {
  H2Heading,
  Body1Text,
  ButtonTextWhite,
  H3Subheading,
} from '../../../assets/Fonts';
import {
  HeaderContainer,
  PageContainer,
  ReviewContainer,
  ReviewHeader,
  ReviewScreenContainer,
} from './styles';
import { VoucherCard } from '../../components/VoucherReview/VoucherCard';
import { Ionicons } from '@expo/vector-icons';
import { ButtonMagenta } from '../../../assets/Components';

//TODO: @oahnh Figure out why voucher card doesn't render in view
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <SafeAreaView>
        <ReviewHeader>
          <Ionicons name="chevron-back" size={25} color={Colors.darkGray} />
          <H3Subheading>Back</H3Subheading>
        </ReviewHeader>
        {/* {vouchers.map(item => (
        <VoucherCard
          key={item.id}
          id={item.id}
          amount={item.amount}
          date={item.date}
        />
      ))} */}
      </SafeAreaView>
    </View>
  );
};

export default ReviewScreen;
