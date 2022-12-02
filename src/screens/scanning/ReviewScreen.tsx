import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';
import {
  H2Heading,
  Body1Text,
  ButtonTextWhite,
  H3Subheading,
  H1Heading,
} from '../../../assets/Fonts';
import {
  HeaderContainer,
  PageContainer,
  ReviewContainer,
  ReviewHeader,
  ReviewScreenContainer,
} from './styles';
import VoucherCard from '../../components/VoucherReview/VoucherCard';
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
    <SafeAreaView>
      <PageContainer>
        <ReviewHeader>
          <Ionicons name="chevron-back" size={25} color={Colors.darkGray} />
          <Body1Text>Back</Body1Text>
        </ReviewHeader>
        <H2Heading>Review Vouchers</H2Heading>
        {/* Make this container scrollable */}
        <View style={styles.container}>
          {vouchers.map(item => (
            <VoucherCard
              key={item.id}
              id={item.id}
              date={item.date}
              amount={item.amount}
            />
          ))}
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ffffff',
    width: '100%',
    borderTopColor: `${Colors.lightGray}`,
    borderBottomColor: `${Colors.lightGray}`,
  },
});

export default ReviewScreen;
