import React from 'react';
import Modal from 'react-native-modal';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  CenteredTextContainer,
  CloseButtonContainer,
  FilterModalTextContainer,
  HorizontalSpacing,
  RightAlignContainer,
  Styles,
  SubheadingContainer,
  FilterVerticalSpacing,
  DatePickerContainer,
  CenteredContainer,
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
      <FilterModalTextContainer>
        <ScrollView>
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

          <OneLine>
            <LeftAlignContainer>
              <FilterField
                isSelected={filterState.inProgressMinDateIsSet}
                onPress={() => setMinDatePickerIsVisible(true)}
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

              <DatePickerContainer>
                {minDatePickerIsVisible ? (
                  <RNDateTimePicker
                    mode="date"
                    value={filterState.inProgressMinDate}
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
                ) : null}
              </DatePickerContainer>
            </LeftAlignContainer>
            <HorizontalSpacing />
            <RightAlignContainer>
              <FilterField
                isSelected={filterState.inProgressMaxDateIsSet}
                onPress={() => setMaxDatePickerIsVisible(true)}
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

              <DatePickerContainer>
                {maxDatePickerIsVisible ? (
                  <RNDateTimePicker
                    mode="date"
                    value={filterState.inProgressMaxDate}
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
                ) : null}
              </DatePickerContainer>
            </RightAlignContainer>
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
                isSelected={filterState.inProgressMaxDateIsSet}
                onPress={() => {
                  /* TODO: implement amount picker */
                }}
              >
                <Body1Text>
                  {filterState.inProgressMaxAmountIsSet ? (
                    `$${filterState.inProgressMaxAmount}`
                  ) : (
                    <MidGrayText>$ Max</MidGrayText>
                  )}
                </Body1Text>
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
        </ScrollView>
      </FilterModalTextContainer>
    </Modal>
  );
}
