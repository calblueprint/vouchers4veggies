import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import Colors from '../../../assets/Colors';
import { Body1Text, H3Subheading } from '../../../assets/Fonts';
import { StatusContainer, ValueContainer, styles } from './styles';
import { Card, Column } from '../../../assets/Components';
import StatusComponent from './StatusComponent';
import { InvoiceStackParamList } from '../../navigation/types';
import {
  formatTimeForDisplay,
  formatValueForDisplay,
} from '../../utils/displayUtils';

type InvoiceCardProps = {
  navigation: NativeStackNavigationProp<
    InvoiceStackParamList,
    'InvoicesScreen',
    undefined
  >;
  date: Date;
  id: string;
  value: number;
  status: string;
};
export default function InvoiceCard({
  navigation,
  date,
  id,
  value,
  status,
}: InvoiceCardProps) {
  const time = moment(date);

  const onNavigate = () => {
    navigation.navigate('InvoiceDetailsScreen', {
      invoiceUuid: id,
    });
  };

  return (
    <TouchableOpacity onPress={onNavigate}>
      <Card>
        <Column>
          <Body1Text>{time.format('M/D')}</Body1Text>
          <Body1Text>{formatTimeForDisplay(time)}</Body1Text>
        </Column>

        <ValueContainer>
          <H3Subheading>${formatValueForDisplay(value)}</H3Subheading>
        </ValueContainer>

        <StatusContainer>
          <StatusComponent status={status} />
        </StatusContainer>

        <Icon
          name="right"
          size={25}
          style={styles.icon}
          color={Colors.midGray}
        />
      </Card>
    </TouchableOpacity>
  );
}
