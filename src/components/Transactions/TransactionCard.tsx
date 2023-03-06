import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import Colors from '../../../assets/Colors';
import { Body1Text, H3Subheading } from '../../../assets/Fonts';
import {
  StatusContainer,
  DateContainer,
  ValueContainer,
  Row,
  Styles,
  Body1SemiboldText,
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
  const time = moment(date);

  return (
    <Row>
      <DateContainer>
        <Body1Text>{time.format('M/D')}</Body1Text>
        <Body1Text>{time.format('h:mmA')}</Body1Text>
      </DateContainer>

      <ValueContainer>
        <H3Subheading>${(value / 100).toFixed(2)}</H3Subheading>
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
