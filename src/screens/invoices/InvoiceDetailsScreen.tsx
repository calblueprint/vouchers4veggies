import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import {
  CardContainer,
  CenteredRow,
  SafeArea,
  StartOfListView,
} from '../../../assets/Components';
import BackButton from '../../components/common/BackButton';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusComponent from '../../components/invoices/StatusComponent';
import VoucherCard from '../../components/invoices/VoucherCard';
import { getInvoice, getVoucher } from '../../database/queries';
import { InvoiceStackScreenProps } from '../../navigation/types';
import { Invoice, Voucher } from '../../types/types';
import StandardHeader from '../../components/common/StandardHeader';
import {
  formatTimeForDisplay,
  formatValueForDisplay,
} from '../../utils/displayUtils';
import BodyContainer from './styles';
import { SortVoucherOption, useSortReducer } from '../../utils/invoiceUtils';
import SortModal from '../../components/invoices/SortModal';
import SortAndFilterButton from '../../components/invoices/SortAndFilterButton';
import {
  Body1TextSemibold,
  H5Subheading,
  TitleText,
} from '../../../assets/Fonts';

const sortButtonText = ['SN', 'SN', 'Date', 'Date'];
const sortDescriptionText = [
  'Serial Number: High to Low',
  'Serial Number: Low to High',
  'Date: Newest',
  'Date: Oldest',
];

export default function InvoiceDetailsScreen({
  route,
  navigation,
}: InvoiceStackScreenProps<'InvoiceDetailsScreen'>) {
  const { invoiceUuid } = route.params;
  const [invoiceData, setInvoiceData] = useState<Invoice>();
  const [defaultVoucherArray, setDefaultVoucherArray] = useState<Voucher[]>([]);
  const [displayedVoucherArray, setDisplayedVoucherArray] = useState<Voucher[]>(
    [],
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [sortModalIsVisible, setSortModalIsVisible] = useState(false);
  const { sortState, sortDispatch } = useSortReducer(
    'vouchers',
    displayedVoucherArray,
    defaultVoucherArray,
    setDisplayedVoucherArray,
  );

  const fetchData = async (Uuid: string | null) => {
    try {
      if (Uuid) {
        const data = await getInvoice(Uuid);
        setInvoiceData(data);

        const voucherData = await Promise.all(
          data.voucherSerialNumbers.map(item => getVoucher(item)),
        );
        setDefaultVoucherArray(voucherData);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('(useEffect)[InvoicenDetailsScreen]', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
    fetchData(invoiceUuid).then(() => {
      sortDispatch({ type: 'ON_RELOAD' });
    });
  }, [invoiceUuid, sortDispatch]);

  useEffect(() => {
    fetchData(invoiceUuid).then(() => {
      sortDispatch({ type: 'ON_RELOAD' });
    });
  }, [invoiceUuid, sortDispatch]);

  const time = moment(invoiceData?.timestamp.toDate());

  const onPressBackButton = () => navigation.goBack();

  return (
    <SafeArea>
      <StandardHeader>
        <BackButton onPress={onPressBackButton} />
      </StandardHeader>

      {invoiceData ? (
        <>
          <StatusComponent status={invoiceData.status} />
          <TitleText>${formatValueForDisplay(invoiceData.value)}</TitleText>
          <H5Subheading>Date: {time.format('M/D/YY')}</H5Subheading>
          <H5Subheading>Time: {formatTimeForDisplay(time)}</H5Subheading>

          <BodyContainer>
            <Body1TextSemibold>
              Count: {invoiceData.voucherSerialNumbers.length}
            </Body1TextSemibold>
          </BodyContainer>

          <BodyContainer>
            <CenteredRow>
              <SortAndFilterButton
                modalIsVisible={sortModalIsVisible}
                setModalIsVisible={setSortModalIsVisible}
                isSelected={sortState.sortType !== SortVoucherOption.NO_SORT}
                type="sort"
                title={
                  sortState.isActive
                    ? `Sort by: ${sortButtonText[sortState.sortType]}`
                    : 'Sort by'
                }
                width="100%"
              />
            </CenteredRow>
          </BodyContainer>

          <CardContainer>
            <StartOfListView />
            <FlatList
              data={displayedVoucherArray}
              renderItem={({ item }) => (
                <VoucherCard
                  serialNumber={item.serialNumber}
                  value={item.value}
                />
              )}
              keyExtractor={item => item.serialNumber.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          </CardContainer>
        </>
      ) : (
        <LoadingSpinner />
      )}

      <SortModal
        title="vouchers"
        isVisible={sortModalIsVisible}
        setIsVisible={setSortModalIsVisible}
        sortDescriptions={sortDescriptionText}
        sortState={sortState}
        sortDispatch={sortDispatch}
      />
    </SafeArea>
  );
}
