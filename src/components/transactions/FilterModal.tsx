import React from 'react';
import Modal from 'react-native-modal';
import { Alert, Platform, TouchableOpacity, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  CenteredTextContainer,
  CloseButtonContainer,
  FilterModalContainer,
  HorizontalSpacing,
  RightAlignContainer,
  Styles,
  SubheadingContainer,
  FilterVerticalSpacing,
  DatePickerContainer,
  CenteredContainer,
  PaddedScrollView,
} from './styles';
import {
  BlueText,
  Body1SemiboldText,
  Body1Text,
  ButtonTextWhite,
  H4CardNavTab,
  MidGrayText,
} from '../../../assets/Fonts';
import { LeftAlignContainer, OneLine } from '../common/styles';
import ClearButton from './ClearButton';
import {
  FilterDispatch,
  FilterState,
  SortTransactionDispatch,
} from '../../utils/transactionUtils';
import FilterField from './FilterField';
import { ButtonMagenta } from '../../../assets/Components';
import { TransactionStatus } from '../../types/types';
import FilterTag from './FilterTag';

type FilterModalProps = {
  filterState: FilterState;
  filterDispatch: FilterDispatch;
  sortDispatch: SortTransactionDispatch;
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
  return (
    <Modal
      isVisible={isVisible}
      coverScreen={false}
      style={Styles.modal}
      backdropTransitionOutTiming={0}
    >
      <FilterModalContainer>
        <CloseButtonContainer>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
              filterDispatch({ type: 'RESET_IN_PROGRESS' });
            }}
          >
            <BlueText>
              <Body1Text>Close</Body1Text>
            </BlueText>
          </TouchableOpacity>
        </CloseButtonContainer>

        <PaddedScrollView alwaysBounceVertical={false}>
          <CenteredTextContainer>
            <H4CardNavTab>Filter Invoices</H4CardNavTab>
          </CenteredTextContainer>

          <SubheadingContainer>
            <OneLine>
              <Body1SemiboldText>Filter by date</Body1SemiboldText>
              <ClearButton
                isDisabled={
                  !(
                    filterState.inProgressMinDateIsSet ||
                    filterState.inProgressMaxDateIsSet
                  )
                }
                onPress={() => {
                  filterDispatch({
                    type: 'CLEAR_DATE_FILTERS',
                  });
                }}
              />
            </OneLine>
          </SubheadingContainer>

          <OneLine style={{ zIndex: 5 }}>
            <LeftAlignContainer>
              <FilterField
                isSelected={filterState.inProgressMinDateIsSet}
                onPress={() => {
                  if (maxDatePickerIsVisible) {
                    setMaxDatePickerIsVisible(false);
                  }
                  setMinDatePickerIsVisible(true);
                }}
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
            <HorizontalSpacing />
            <RightAlignContainer>
              <FilterField
                isSelected={filterState.inProgressMaxDateIsSet}
                onPress={() => {
                  if (minDatePickerIsVisible) {
                    setMinDatePickerIsVisible(false);
                  }
                  setMaxDatePickerIsVisible(true);
                }}
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
                  onChange={e => {
                    setMinDatePickerIsVisible(false);
                    if (e.type === 'set' && e.nativeEvent.timestamp) {
                      filterDispatch({
                        type: 'SET_MIN_DATE',
                        date: new Date(e.nativeEvent.timestamp),
                      });
                    }
                  }}
                />
              </DatePickerContainer>
            )}

            {maxDatePickerIsVisible && (
              <DatePickerContainer>
                <RNDateTimePicker
                  mode="date"
                  value={filterState.inProgressMaxDate}
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={e => {
                    setMaxDatePickerIsVisible(false);
                    if (e.type === 'set' && e.nativeEvent.timestamp) {
                      filterDispatch({
                        type: 'SET_MAX_DATE',
                        date: new Date(e.nativeEvent.timestamp),
                      });
                    }
                  }}
                />
              </DatePickerContainer>
            )}
          </OneLine>

          <SubheadingContainer>
            <OneLine>
              <Body1SemiboldText>Filter by status</Body1SemiboldText>
              <ClearButton
                isDisabled={filterState.inProgressStatusFilter === 'none'}
                onPress={() => {
                  filterDispatch({
                    type: 'CLEAR_STATUS_FILTER',
                  });
                }}
              />
            </OneLine>
          </SubheadingContainer>

          <OneLine>
            <FilterTag
              isSelected={
                filterState.inProgressStatusFilter === TransactionStatus.UNPAID
              }
              onPress={() =>
                filterDispatch({
                  type: 'SET_STATUS_FILTER',
                  status: TransactionStatus.UNPAID,
                })
              }
              minWidth={90}
              margin={10}
            >
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                <Body1Text>
                  {filterState.inProgressStatusFilter !==
                  TransactionStatus.UNPAID ? (
                    <MidGrayText>UNPAID</MidGrayText>
                  ) : (
                    'UNPAID'
                  )}
                </Body1Text>
              </View>
            </FilterTag>
            <FilterTag
              isSelected={
                filterState.inProgressStatusFilter === TransactionStatus.PAID
              }
              onPress={() =>
                filterDispatch({
                  type: 'SET_STATUS_FILTER',
                  status: TransactionStatus.PAID,
                })
              }
              minWidth={90}
            >
              <Body1Text>
                {filterState.inProgressStatusFilter !==
                TransactionStatus.PAID ? (
                  <MidGrayText>PAID</MidGrayText>
                ) : (
                  'PAID'
                )}
              </Body1Text>
            </FilterTag>
          </OneLine>

          <SubheadingContainer>
            <OneLine>
              <Body1SemiboldText>Filter by amount</Body1SemiboldText>
              <ClearButton
                isDisabled={
                  !(
                    filterState.inProgressMinAmountIsSet ||
                    filterState.inProgressMaxAmountIsSet
                  )
                }
                onPress={() => {
                  filterDispatch({
                    type: 'CLEAR_AMOUNT_FILTERS',
                  });
                }}
              />
            </OneLine>
          </SubheadingContainer>

          <OneLine>
            <FilterTag
              isSelected={
                filterState.inProgressMinAmount === 0 &&
                filterState.inProgressMaxAmount === 10
              }
              onPress={() => {
                if (
                  filterState.inProgressMinAmount === 0 &&
                  filterState.inProgressMaxAmount === 10
                ) {
                  filterDispatch({ type: 'CLEAR_AMOUNT_FILTERS' });
                } else {
                  filterDispatch({
                    type: 'SET_AMOUNT',
                    minAmount: 0,
                    maxAmount: 10,
                  });
                }
              }}
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
              onPress={() => {
                if (
                  filterState.inProgressMinAmount === 11 &&
                  filterState.inProgressMaxAmount === 20
                ) {
                  filterDispatch({ type: 'CLEAR_AMOUNT_FILTERS' });
                } else {
                  filterDispatch({
                    type: 'SET_AMOUNT',
                    minAmount: 11,
                    maxAmount: 20,
                  });
                }
              }}
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
              onPress={() => {
                if (
                  filterState.inProgressMinAmount === 21 &&
                  filterState.inProgressMaxAmount === 50
                ) {
                  filterDispatch({ type: 'CLEAR_AMOUNT_FILTERS' });
                } else {
                  filterDispatch({
                    type: 'SET_AMOUNT',
                    minAmount: 21,
                    maxAmount: 50,
                  });
                }
              }}
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
              onPress={() => {
                if (
                  filterState.inProgressMinAmount === 51 &&
                  !filterState.inProgressMaxAmountIsSet
                ) {
                  filterDispatch({ type: 'CLEAR_AMOUNT_FILTERS' });
                } else {
                  filterDispatch({
                    type: 'SET_AMOUNT',
                    minAmount: 51,
                    maxAmount: null,
                  });
                }
              }}
              minWidth={73}
            >
              <Body1Text>50+</Body1Text>
            </FilterTag>
          </OneLine>

          <FilterVerticalSpacing />
          <CenteredContainer>
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
          </CenteredContainer>
        </PaddedScrollView>
      </FilterModalContainer>
    </Modal>
  );
}
