import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Colors from '../../../assets/Colors';
import { Body1Text, H3Subheading } from '../../../assets/Fonts';
import {
  StatusContainer,
  DateContainer,
  ValueContainer,
  Row,
  Styles,
} from './styles';
import StatusComponent from './StatusComponent';
import { TransactionStackParamList } from '../../navigation/types';

type TransactionCardProps = {
  navigation: NativeStackNavigationProp<
    TransactionStackParamList,
    'TransactionsScreen',
    undefined
  >;
  date: Date;
  id: string;
  value: number;
  status: string;
};
export default function TransactionCard({
  navigation,
  date,
  id,
  value,
  status,
}: TransactionCardProps) {
  return (
    <Row>
      <DateContainer>
        <Body1Text style={Styles.semibold}>
          {date.toLocaleString('en-US', { dateStyle: 'short' })}
        </Body1Text>
        <Body1Text style={Styles.semibold}>
          {date.toLocaleString('en-US', { timeStyle: 'short' })}
        </Body1Text>
      </DateContainer>

      <ValueContainer>
        <H3Subheading style={Styles.semibold}>
          ${(value / 100).toFixed(2)}
        </H3Subheading>
      </ValueContainer>

      <StatusContainer>
        <StatusComponent status={status} />
      </StatusContainer>

      <AntDesign.Button
        name="right"
        size={25}
        style={Styles.IconButton}
        color={Colors.midGray}
        onPress={() => {
          navigation.navigate('TransactionDetailsScreen', {
            transactionUuid: id,
          });
        }}
      />
    </Row>
  );
}
