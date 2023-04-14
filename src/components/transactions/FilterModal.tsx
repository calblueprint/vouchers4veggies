import React from 'react';
import Modal from 'react-native-modal';
import { TouchableOpacity, View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  CenteredContainer,
  CloseButtonContainer,
  FilterModalTextContainer,
  HorizontalSpaceContainer,
  RightAlignContainer,
  Styles,
  SubheadingContainer,
  VerticalSpaceContainer,
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
} from '../../screens/transactions/TransactionsContext';
import FilterField from './FilterField';
import { ButtonMagenta } from '../../../assets/Components';
import { TransactionStatus } from '../../types/types';

type FilterModalProps = {
  filterState: FilterState;
  filterDispatch: FilterDispatch;
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
  isVisible,
  setIsVisible,
  minDatePickerIsVisible,
  setMinDatePickerIsVisible,
  maxDatePickerIsVisible,
  setMaxDatePickerIsVisible,
}: FilterModalProps) {
  return (
    <Modal isVisible={isVisible} coverScreen={false} style={Styles.modal}>
      <FilterModalTextContainer>
        <CloseButtonContainer>
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <BlueText>
              <Body1Text>Close</Body1Text>
            </BlueText>
          </TouchableOpacity>
        </CloseButtonContainer>

        <CenteredContainer>
          <H4CardNavTab>Filter Invoices</H4CardNavTab>
        </CenteredContainer>

        <SubheadingContainer>
          <OneLine>
            <Body1SemiboldText>Filter by date</Body1SemiboldText>
            <ClearButton
              isDisabled={
                !(filterState.minDateIsSet || filterState.maxDateIsSet)
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
              isSelected={filterState.minDateIsSet}
              onPress={() => setMinDatePickerIsVisible(true)}
              width="93%"
              minWidth={148}
              useCalendarIcon
            >
              <Body1Text>
                {filterState.minDateIsSet ? (
                  moment(filterState.minDate).format('M/DD/YYYY')
                ) : (
                  <MidGrayText>From</MidGrayText>
                )}
              </Body1Text>
            </FilterField>
          </LeftAlignContainer>
          <RightAlignContainer>
            <FilterField
              isSelected={filterState.maxDateIsSet}
              onPress={() => setMaxDatePickerIsVisible(true)}
              width="93%"
              minWidth={148}
              useCalendarIcon
            >
              <Body1Text>
                {filterState.maxDateIsSet ? (
                  moment(filterState.maxDate).format('M/D/YY')
                ) : (
                  <MidGrayText>To</MidGrayText>
                )}
              </Body1Text>
            </FilterField>
          </RightAlignContainer>
        </OneLine>
        {minDatePickerIsVisible ? (
          <RNDateTimePicker
            value={filterState.minDate}
            onChange={e => {
              if (e.type === 'set' && e.nativeEvent.timestamp) {
                filterDispatch({
                  type: 'SET_MIN_DATE',
                  date: new Date(e.nativeEvent.timestamp),
                });
              }
              setMinDatePickerIsVisible(false);
            }}
          />
        ) : null}
        {maxDatePickerIsVisible ? (
          <RNDateTimePicker
            value={filterState.maxDate}
            onChange={e => {
              if (e.type === 'set' && e.nativeEvent.timestamp) {
                filterDispatch({
                  type: 'SET_MAX_DATE',
                  date: new Date(e.nativeEvent.timestamp),
                });
              }
              setMaxDatePickerIsVisible(false);
            }}
          />
        ) : null}

        <SubheadingContainer>
          <Body1SemiboldText>Filter by status</Body1SemiboldText>
        </SubheadingContainer>

        <OneLine>
          <FilterField
            isSelected={filterState.statusFilter === TransactionStatus.UNPAID}
            onPress={() =>
              filterDispatch({
                type: 'SET_STATUS_FILTER',
                status: TransactionStatus.UNPAID,
              })
            }
            width={91}
            centerText
          >
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <CenteredContainer>
                <Body1Text>
                  {filterState.statusFilter !== TransactionStatus.UNPAID ? (
                    <MidGrayText>UNPAID</MidGrayText>
                  ) : (
                    'UNPAID'
                  )}
                </Body1Text>
              </CenteredContainer>
            </View>
          </FilterField>
          <HorizontalSpaceContainer />
          <FilterField
            isSelected={filterState.statusFilter === TransactionStatus.PAID}
            onPress={() =>
              filterDispatch({
                type: 'SET_STATUS_FILTER',
                status: TransactionStatus.PAID,
              })
            }
            width={91}
            centerText
          >
            <CenteredContainer>
              <Body1Text>
                {filterState.statusFilter !== TransactionStatus.PAID ? (
                  <MidGrayText>PAID</MidGrayText>
                ) : (
                  'PAID'
                )}
              </Body1Text>
            </CenteredContainer>
          </FilterField>
        </OneLine>

        <SubheadingContainer>
          <Body1SemiboldText>Filter by amount</Body1SemiboldText>
        </SubheadingContainer>

        <VerticalSpaceContainer />
        <VerticalSpaceContainer />
        <CenteredContainer>
          <ButtonMagenta>
            <ButtonTextWhite>Apply</ButtonTextWhite>
          </ButtonMagenta>
        </CenteredContainer>
      </FilterModalTextContainer>
    </Modal>
  );
}
