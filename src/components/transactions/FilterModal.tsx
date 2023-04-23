import React from 'react';
import Modal from 'react-native-modal';
import { Platform, TouchableOpacity, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
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
                useCalendarIcon
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
                useCalendarIcon
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
            <FilterField
              isSelected={
                filterState.inProgressStatusFilter === TransactionStatus.UNPAID
              }
              onPress={() =>
                filterDispatch({
                  type: 'SET_STATUS_FILTER',
                  status: TransactionStatus.UNPAID,
                })
              }
              minWidth={91}
              centerText
            >
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                <CenteredTextContainer>
                  <Body1Text>
                    {filterState.inProgressStatusFilter !==
                    TransactionStatus.UNPAID ? (
                      <MidGrayText>UNPAID</MidGrayText>
                    ) : (
                      'UNPAID'
                    )}
                  </Body1Text>
                </CenteredTextContainer>
              </View>
            </FilterField>
            <HorizontalSpacing />
            <FilterField
              isSelected={
                filterState.inProgressStatusFilter === TransactionStatus.PAID
              }
              onPress={() =>
                filterDispatch({
                  type: 'SET_STATUS_FILTER',
                  status: TransactionStatus.PAID,
                })
              }
              minWidth={91}
              centerText
            >
              <CenteredTextContainer>
                <Body1Text>
                  {filterState.inProgressStatusFilter !==
                  TransactionStatus.PAID ? (
                    <MidGrayText>PAID</MidGrayText>
                  ) : (
                    'PAID'
                  )}
                </Body1Text>
              </CenteredTextContainer>
            </FilterField>
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
            <LeftAlignContainer>
              <FilterField
                isSelected={filterState.inProgressMinAmountIsSet}
                onPress={() => {
                  /* TODO: implement amount picker */
                }}
              >
                <Body1Text>
                  {filterState.inProgressMinAmountIsSet ? (
                    `$${filterState.inProgressMinAmount}`
                  ) : (
                    <MidGrayText>$ Min</MidGrayText>
                  )}
                </Body1Text>
              </FilterField>
            </LeftAlignContainer>

            <HorizontalSpacing>
              <CenteredTextContainer>
                <Body1Text>
                  <MidGrayText>-</MidGrayText>
                </Body1Text>
              </CenteredTextContainer>
            </HorizontalSpacing>

            <RightAlignContainer>
              <FilterField
                isSelected={filterState.inProgressMaxAmountIsSet}
                onPress={() => {
                  /* TODO: implement amount picker */
                }}
              >
                {/* <Body1Text>
                  {filterState.inProgressMaxAmountIsSet ? (
                    `$${filterState.inProgressMaxAmount}`
                  ) : (
                    <MidGrayText>$ Max</MidGrayText>
                  )}
                </Body1Text> */}
                <Picker
                  selectedValue={filterState.inProgressMinAmount}
                  onValueChange={(item: number) =>
                    filterDispatch({ type: 'SET_MIN_AMOUNT', amount: item })
                  }
                  enabled
                >
                  <Picker.Item label="5" value={5} />
                  <Picker.Item label="10" value={10} />
                </Picker>
              </FilterField>
            </RightAlignContainer>
          </OneLine>

          <FilterVerticalSpacing />
          <CenteredContainer>
            <ButtonMagenta
              onPress={() => {
                setIsVisible(false);
                Promise.resolve().then(() => {
                  filterDispatch({ type: 'ON_SUBMIT' });
                  sortDispatch({ type: 'ON_RELOAD' });
                });
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
