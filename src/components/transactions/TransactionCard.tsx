import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import Colors from '../../../assets/Colors';
import { Body1Text, H3Subheading } from '../../../assets/Fonts';
import {
  StatusContainer,
  LeftAlignContainer,
  ValueContainer,
  Row,
  Styles,
} from './styles';
import StatusComponent from './StatusComponent';
import { TransactionStackParamList } from '../../navigation/types';
import {
  formatTimeForDisplay,
  formatValueForDisplay,
} from '../../utils/displayUtils';

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
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('TransactionDetailsScreen', {
          transactionUuid: id,
        });
      }}
    >
      <Row>
        <LeftAlignContainer>
          <Body1Text>{time.format('M/D')}</Body1Text>
          <Body1Text>{formatTimeForDisplay(time)}</Body1Text>
        </LeftAlignContainer>

        <ValueContainer>
          <H3Subheading>${formatValueForDisplay(value)}</H3Subheading>
        </ValueContainer>

        <StatusContainer>
          <StatusComponent status={status} />
        </StatusContainer>

        <Icon
          name="right"
          size={25}
          style={Styles.icon}
          color={Colors.midGray}
        />
      </Row>
    </TouchableOpacity>
  );
}
