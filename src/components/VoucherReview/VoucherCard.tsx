import React from 'react';
import { ReviewRow, PriceEditContainer, DateIdContainer } from './styles';
import { Colors } from '../../../assets/Colors';
import { Body_1_Text, H3_Subheading, LabelText } from '../../../assets/Fonts';
import { Feather } from '@expo/vector-icons';

const VoucherCard = (props: any) => {
  return (
    <ReviewRow>
      <DateIdContainer>
        <Body_1_Text>ID {props.id}</Body_1_Text>
        <LabelText>{props.date}</LabelText>
      </DateIdContainer>
      <PriceEditContainer>
        <H3_Subheading>$ {props.amount}</H3_Subheading>
      </PriceEditContainer>
      <Feather name="trash-2" size={25} color={Colors.midGray} />
    </ReviewRow>
  );
};

export default VoucherCard;
