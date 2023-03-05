import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../../assets/Colors';
import { RootNavBackButton } from '../../../assets/Components';
import { H2Heading } from '../../../assets/Fonts';
import StandardLogo from '../../components/common/StandardLogo';
import TransactionCard from '../../components/Transactions/TransactionCard';
import {
  getTransaction,
  getTransactionsByVendorUuid,
} from '../../database/queries';
import { TransactionStackScreenProps } from '../../navigation/types';
import { Transaction } from '../../types/types';
import {
  LogoContainer,
  TransactionsContainer,
  Title,
  CardContainer,
  BackButtonContainer,
  DarkGrayText,
} from './styles';

export default function TransactionDetailsScreen({
  route,
  navigation,
}: TransactionStackScreenProps<'TransactionDetailsScreen'>) {
  const { transactionUuid } = route.params;
  const [transactionsData, setTransactionsData] = useState<Transaction>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // to do: retrieve vendor uuid
        const data = await getTransaction(transactionUuid);
        setTransactionsData(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('(useEffect)[TransactionDetailsScreen]', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <BackButtonContainer>
        <RootNavBackButton
          onPress={() => navigation.navigate('TransactionsScreen')}
        >
          <DarkGrayText>
            <Icon name="left" size={14} color={Colors.darkGray} /> Back
          </DarkGrayText>
        </RootNavBackButton>
      </BackButtonContainer>
      <View>
        In Progress\n
        {transactionsData?.value}
      </View>
    </View>
  );
}
