import React from 'react';
import Modal from 'react-native-modal';
import { Alert, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  CenteredTextContainer,
  CloseButtonContainer,
  FilterModalContainer,
  Styles,
  SubheadingContainer,
  DatePickerContainer,
  CenteredContainer,
  PaddedScrollView,
} from './styles';
import {
  Body1SemiboldText,
  Body1Text,
  ButtonTextWhite,
  H4CardNavTab,
  MidGrayText,
} from '../../../assets/Fonts';
import {
  LeftAlignContainer,
  OneLine,
  RightAlignContainer,
} from '../common/styles';
import ClearButton from './ClearButton';
import {
  FilterDispatch,
  FilterState,
  SortDispatch,
} from '../../utils/transactionUtils';
import FilterField from './FilterField';
import { ButtonMagenta } from '../../../assets/Components';
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
            <Icon name="close" size={24} color={Colors.midBlack} />
          </TouchableOpacity>
        </CloseButtonContainer>

        <PaddedScrollView alwaysBounceVertical={false}>
          <CenteredTextContainer>
            <H4CardNavTab>Filter Invoices</H4CardNavTab>
          </CenteredTextContainer>

          <SubheadingContainer>
            <OneLine>
              <Body1SemiboldText>Filter by date</Body1SemiboldText>
              <RightAlignContainer>
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
              </RightAlignContainer>
            </OneLine>
          </SubheadingContainer>

          <OneLine style={{ zIndex: 5 }}>
            <LeftAlignContainer style={{ marginRight: 20 }}>
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
              <RightAlignContainer>
                <ClearButton
                  isDisabled={filterState.inProgressStatusFilter === 'none'}
                  onPress={() => {
                    filterDispatch({
                      type: 'CLEAR_STATUS_FILTER',
                    });
                  }}
                />
              </RightAlignContainer>
            </OneLine>
          </SubheadingContainer>

          <OneLine>
            <FilterTag
              isSelected={
                filterState.inProgressStatusFilter === TransactionStatus.UNPAID
              }
              onUnselectedPress={() =>
                filterDispatch({
                  type: 'SET_STATUS_FILTER',
                  status: TransactionStatus.UNPAID,
                })
              }
              onSelectedPress={() =>
                filterDispatch({ type: 'CLEAR_STATUS_FILTER' })
              }
              minWidth={90}
              margin={10}
            >
              <Body1Text>UNPAID</Body1Text>
            </FilterTag>

            <FilterTag
              isSelected={
                filterState.inProgressStatusFilter === TransactionStatus.PAID
              }
              onUnselectedPress={() =>
                filterDispatch({
                  type: 'SET_STATUS_FILTER',
                  status: TransactionStatus.PAID,
                })
              }
              onSelectedPress={() =>
                filterDispatch({ type: 'CLEAR_STATUS_FILTER' })
              }
              minWidth={90}
            >
              <Body1Text>PAID</Body1Text>
            </FilterTag>
          </OneLine>

          <SubheadingContainer>
            <OneLine>
              <Body1SemiboldText>Filter by amount</Body1SemiboldText>
              <RightAlignContainer>
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
              </RightAlignContainer>
            </OneLine>
          </SubheadingContainer>

          <OneLine style={{ marginBottom: 48 }}>
            <ScrollView horizontal alwaysBounceHorizontal={false}>
              <FilterTag
                isSelected={
                  filterState.inProgressMinAmount === 0 &&
                  filterState.inProgressMaxAmount === 10
                }
                onSelectedPress={() =>
                  filterDispatch({ type: 'CLEAR_AMOUNT_FILTERS' })
                }
                onUnselectedPress={() =>
                  filterDispatch({
                    type: 'SET_AMOUNT',
                    minAmount: 0,
                    maxAmount: 10,
                  })
                }
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
                onSelectedPress={() =>
                  filterDispatch({ type: 'CLEAR_AMOUNT_FILTERS' })
                }
                onUnselectedPress={() =>
                  filterDispatch({
                    type: 'SET_AMOUNT',
                    minAmount: 11,
                    maxAmount: 20,
                  })
                }
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
                onSelectedPress={() =>
                  filterDispatch({ type: 'CLEAR_AMOUNT_FILTERS' })
                }
                onUnselectedPress={() =>
                  filterDispatch({
                    type: 'SET_AMOUNT',
                    minAmount: 21,
                    maxAmount: 50,
                  })
                }
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
                onSelectedPress={() =>
                  filterDispatch({ type: 'CLEAR_AMOUNT_FILTERS' })
                }
                onUnselectedPress={() =>
                  filterDispatch({
                    type: 'SET_AMOUNT',
                    minAmount: 51,
                    maxAmount: null,
                  })
                }
                minWidth={73}
              >
                <Body1Text>50+</Body1Text>
              </FilterTag>
            </ScrollView>
          </OneLine>

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
