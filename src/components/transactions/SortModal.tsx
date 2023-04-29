import React from 'react';
import Modal from 'react-native-modal';
import { TouchableOpacity, View } from 'react-native';
import {
  CloseButtonContainer,
  SortModalContainer,
  Styles,
  CenteredContainer,
  PaddedScrollView,
  ClearButtonContainer,
} from './styles';
import {
  BlueText,
  Body1Text,
  ButtonTextWhite,
  H4CardNavTab,
} from '../../../assets/Fonts';
import RadioButton from '../common/RadioButton';
import { SortDispatch, SortState } from '../../utils/transactionUtils';
import { ButtonMagenta } from '../../../assets/Components';
import { OneLine } from '../common/styles';
import ClearButton from './ClearButton';

type SortModalProps = {
  name: 'invoices' | 'vouchers';
  isVisible: boolean;
  setIsVisible: (visibility: boolean) => void;
  sortState: SortState;
  sortDispatch: SortDispatch;
  sortDescriptions: string[];
};
export default function SortModal({
  name,
  isVisible,
  setIsVisible,
  sortState,
  sortDispatch,
  sortDescriptions,
}: SortModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      coverScreen={false}
      style={Styles.modal}
      backdropTransitionOutTiming={0}
    >
      <SortModalContainer>
        <OneLine>
          <ClearButtonContainer>
            <ClearButton
              isDisabled={
                !sortState.isActive && sortState.inProgressSortType === -1
              }
              onPress={() => sortDispatch({ type: 'CLEAR_SORT' })}
            />
          </ClearButtonContainer>
          <CloseButtonContainer>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
                sortDispatch({ type: 'RESET_IN_PROGRESS' });
              }}
            >
              <BlueText>
                <Body1Text>Close</Body1Text>
              </BlueText>
            </TouchableOpacity>
          </CloseButtonContainer>
        </OneLine>

        <PaddedScrollView alwaysBounceVertical={false}>
          <H4CardNavTab
            style={{ marginBottom: 22 }}
          >{`Sort ${name} by`}</H4CardNavTab>
          <View style={{ marginBottom: 22 }}>
            <RadioButton
              data={sortDescriptions}
              selected={sortState.inProgressSortType}
              setSelected={(index: number) => {
                sortDispatch({ type: 'SORT_BY', option: index });
              }}
            />
          </View>

          <CenteredContainer>
            <ButtonMagenta
              onPress={() => {
                setIsVisible(false);
                sortDispatch({ type: 'ON_SUBMIT' });
              }}
            >
              <ButtonTextWhite>Apply</ButtonTextWhite>
            </ButtonMagenta>
          </CenteredContainer>
        </PaddedScrollView>
      </SortModalContainer>
    </Modal>
  );
}
