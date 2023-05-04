import React from 'react';
import Modal from 'react-native-modal';
import { Alert, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  CloseButtonContainer,
  FilterModalContainer,
  styles,
  SubheadingContainer,
  DatePickerContainer,
  ButtonMagentaContainer,
  PaddedScrollView,
} from './styles';
import {
  Body1TextSemibold,
  Body1Text,
  ButtonTextWhite,
  H4CardNavTab,
  MidGrayText,
  CenterText,
} from '../../../assets/Fonts';
import {
  LeftAlignContainer,
  Row,
  RightAlignContainer,
  ButtonMagenta,
} from '../../../assets/Components';
import ClearButton from './ClearButton';
import {
  FilterDispatch,
  FilterState,
  SortDispatch,
} from '../../utils/transactionUtils';
import FilterField from './FilterField';

import { TransactionStatus } from '../../types/types';
import FilterTag from './FilterTag';
import Colors from '../../../assets/Colors';

type FilterModalProps = {
  filterState: FilterState;
  filterDispatch: FilterDispatch;
  sortDispatch: SortDispatch;
  isVisible: boolean;
  setIsVisible: (visibility: boolean) => void;
  minDatePickerIsVisible: boolean;
  setMinDatePickerIsVisible: (visibility: boolean) => void;
  maxDatePickerIsVisible: boolean;
  setMaxDatePickerIsVisible: (visibility: boolean) => void;
};

export default function FilterModal({
  filterState,
  filterDispatch,
  sortDispatch,
  isVisible,
  setIsVisible,
  minDatePickerIsVisible,
  setMinDatePickerIsVisible,
  maxDatePickerIsVisible,
  setMaxDatePickerIsVisible,
}: FilterModalProps) {
  const onClose = () => {
    setIsVisible(false);
    filterDispatch({ type: 'RESET_IN_PROGRESS' });
  };

  const onClearDateFilters = () =>
    filterDispatch({
      type: 'CLEAR_DATE_FILTERS',
    });

  const onSelectMinDatePicker = () => {
    if (maxDatePickerIsVisible) {
      setMaxDatePickerIsVisible(false);
    }
    setMinDatePickerIsVisible(true);
  };
  const onSelectMaxDatePicker = () => {
    if (minDatePickerIsVisible) {
      setMinDatePickerIsVisible(false);
    }
    setMaxDatePickerIsVisible(true);
  };

  const onChangeMinDatePicker = (e: DateTimePickerEvent) => {
    setMinDatePickerIsVisible(false);
    if (e.type === 'set' && e.nativeEvent.timestamp) {
      filterDispatch({
        type: 'SET_MIN_DATE',
        date: new Date(e.nativeEvent.timestamp),
      });
    }
  };
  const onChangeMaxDatePicker = (e: DateTimePickerEvent) => {
    setMaxDatePickerIsVisible(false);
    if (e.type === 'set' && e.nativeEvent.timestamp) {
      filterDispatch({
        type: 'SET_MAX_DATE',
        date: new Date(e.nativeEvent.timestamp),
      });
    }
  };

  const onClearStatusFilter = () =>
    filterDispatch({
      type: 'CLEAR_STATUS_FILTER',
    });

  const onSelectPaidFilter = () =>
    filterDispatch({
      type: 'SET_STATUS_FILTER',
      status: TransactionStatus.UNPAID,
    });
  const onSelectUnpaidFilter = () =>
    filterDispatch({
      type: 'SET_STATUS_FILTER',
      status: TransactionStatus.PAID,
    });

  const onClearAmountFilter = () =>
    filterDispatch({
      type: 'CLEAR_AMOUNT_FILTERS',
    });
  const onSelectAmount0To10 = () =>
    filterDispatch({
      type: 'SET_AMOUNT',
      minAmount: 0,
      maxAmount: 10,
    });
  const onSelectAmount11To20 = () =>
    filterDispatch({
      type: 'SET_AMOUNT',
      minAmount: 11,
      maxAmount: 20,
    });
  const onSelectAmount21To50 = () =>
    filterDispatch({
      type: 'SET_AMOUNT',
      minAmount: 21,
      maxAmount: 50,
    });
  const onSelectAmountOver50 = () =>
    filterDispatch({
      type: 'SET_AMOUNT',
      minAmount: 51,
      maxAmount: null,
    });

  return (
    <Modal
      isVisible={isVisible}
      coverScreen={false}
      style={styles.modal}
      backdropTransitionOutTiming={0}
    >
      <FilterModalContainer>
        <CloseButtonContainer>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={Colors.midBlack} />
          </TouchableOpacity>
        </CloseButtonContainer>

        <PaddedScrollView alwaysBounceVertical={false}>
          <CenterText>
            <H4CardNavTab>Filter Invoices</H4CardNavTab>
          </CenterText>

          <SubheadingContainer>
            <Body1TextSemibold>Filter by date</Body1TextSemibold>
            <RightAlignContainer>
              <ClearButton
                isDisabled={
                  !(
                    filterState.inProgressMinDateIsSet ||
                    filterState.inProgressMaxDateIsSet
                  )
                }
                onPress={onClearDateFilters}
              />
            </RightAlignContainer>
          </SubheadingContainer>

          <Row style={styles.bringToTop}>
            <LeftAlignContainer style={styles.marginRight}>
              <FilterField
                isSelected={filterState.inProgressMinDateIsSet}
                onPress={onSelectMinDatePicker}
                icon="calendar-today"
              >
                <Body1Text>
                  {filterState.inProgressMinDateIsSet ? (
                    moment(filterState.inProgressMinDate).format('M/DD/YYYY')
                  ) : (
                    <MidGrayText>From</MidGrayText>
                  )}
                </Body1Text>
              </FilterField>
            </LeftAlignContainer>
            <RightAlignContainer>
              <FilterField
                isSelected={filterState.inProgressMaxDateIsSet}
                onPress={onSelectMaxDatePicker}
                icon="calendar-today"
              >
                <Body1Text>
                  {filterState.inProgressMaxDateIsSet ? (
                    moment(filterState.inProgressMaxDate).format('M/D/YY')
                  ) : (
                    <MidGrayText>To</MidGrayText>
                  )}
                </Body1Text>
              </FilterField>
            </RightAlignContainer>

            {minDatePickerIsVisible && (
              <DatePickerContainer>
                <RNDateTimePicker
                  mode="date"
                  value={filterState.inProgressMinDate}
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={onChangeMinDatePicker}
                />
              </DatePickerContainer>
            )}
            {maxDatePickerIsVisible && (
              <DatePickerContainer>
                <RNDateTimePicker
                  mode="date"
                  value={filterState.inProgressMaxDate}
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={onChangeMaxDatePicker}
                />
              </DatePickerContainer>
            )}
          </Row>

          <SubheadingContainer>
            <Body1TextSemibold>Filter by status</Body1TextSemibold>
            <RightAlignContainer>
              <ClearButton
                isDisabled={filterState.inProgressStatusFilter === 'none'}
                onPress={onClearStatusFilter}
              />
            </RightAlignContainer>
          </SubheadingContainer>

          <Row>
            <FilterTag
              isSelected={
                filterState.inProgressStatusFilter === TransactionStatus.UNPAID
              }
              onSelectedPress={onClearStatusFilter}
              onUnselectedPress={onSelectPaidFilter}
              minWidth={90}
              margin={10}
            >
              <Body1Text>UNPAID</Body1Text>
            </FilterTag>

            <FilterTag
              isSelected={
                filterState.inProgressStatusFilter === TransactionStatus.PAID
              }
              onSelectedPress={onClearStatusFilter}
              onUnselectedPress={onSelectUnpaidFilter}
              minWidth={90}
            >
              <Body1Text>PAID</Body1Text>
            </FilterTag>
          </Row>

          <SubheadingContainer>
            <Body1TextSemibold>Filter by amount</Body1TextSemibold>
            <RightAlignContainer>
              <ClearButton
                isDisabled={
                  !(
                    filterState.inProgressMinAmountIsSet ||
                    filterState.inProgressMaxAmountIsSet
                  )
                }
                onPress={onClearAmountFilter}
              />
            </RightAlignContainer>
          </SubheadingContainer>

          <Row style={{ marginBottom: 48 }}>
            <ScrollView horizontal alwaysBounceHorizontal={false}>
              <FilterTag
                isSelected={
                  filterState.inProgressMinAmount === 0 &&
                  filterState.inProgressMaxAmount === 10
                }
                onSelectedPress={onClearAmountFilter}
                onUnselectedPress={onSelectAmount0To10}
                minWidth={73}
                margin={10}
              >
                <Body1Text>0-10</Body1Text>
              </FilterTag>

              <FilterTag
                isSelected={
                  filterState.inProgressMinAmount === 11 &&
                  filterState.inProgressMaxAmount === 20
                }
                onSelectedPress={onClearAmountFilter}
                onUnselectedPress={onSelectAmount11To20}
                minWidth={73}
                margin={10}
              >
                <Body1Text>11-20</Body1Text>
              </FilterTag>

              <FilterTag
                isSelected={
                  filterState.inProgressMinAmount === 21 &&
                  filterState.inProgressMaxAmount === 50
                }
                onSelectedPress={onClearAmountFilter}
                onUnselectedPress={onSelectAmount21To50}
                minWidth={73}
                margin={10}
              >
                <Body1Text>21-50</Body1Text>
              </FilterTag>

              <FilterTag
                isSelected={
                  filterState.inProgressMinAmount === 51 &&
                  !filterState.inProgressMaxAmountIsSet
                }
                onSelectedPress={onClearAmountFilter}
                onUnselectedPress={onSelectAmountOver50}
                minWidth={73}
              >
                <Body1Text>50+</Body1Text>
              </FilterTag>
            </ScrollView>
          </Row>

          <ButtonMagentaContainer>
            <ButtonMagenta
              onPress={() => {
                if (
                  filterState.inProgressMinDateIsSet &&
                  filterState.inProgressMaxDateIsSet &&
                  filterState.inProgressMaxDate < filterState.inProgressMinDate
                ) {
                  Alert.alert(
                    'Oh no! Invalid date filter.',
                    'Please try again',
                    [
                      {
                        text: 'OK',
                      },
                    ],
                  );
                } else {
                  setIsVisible(false);
                  Promise.resolve().then(() => {
                    filterDispatch({ type: 'ON_SUBMIT' });
                    sortDispatch({ type: 'ON_RELOAD' });
                  });
                }
              }}
            >
              <ButtonTextWhite>{`Apply${
                filterState.inProgressFilterCount > 0
                  ? ` (${filterState.inProgressFilterCount})`
                  : ''
              }`}</ButtonTextWhite>
            </ButtonMagenta>
          </ButtonMagentaContainer>
        </PaddedScrollView>
      </FilterModalContainer>
    </Modal>
  );
}
