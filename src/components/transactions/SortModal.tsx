import React from 'react';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import {
  CloseButtonContainer,
  SortModalContainer,
  Styles,
  SortVerticalSpacing,
  CenteredContainer,
  PaddedScrollView,
} from './styles';
import {
  BlueText,
  Body1Text,
  ButtonTextWhite,
  H4CardNavTab,
} from '../../../assets/Fonts';
import RadioButton from '../common/RadioButton';
import {
  SortTransactionDispatch,
  SortTransactionState,
  SortVoucherDispatch,
  SortVoucherState,
} from '../../utils/transactionUtils';
import { ButtonMagenta } from '../../../assets/Components';

type SortModalProps = {
  type: 'invoices' | 'vouchers';
  isVisible: boolean;
  setIsVisible: (visibility: boolean) => void;
  sortState: SortTransactionState | SortVoucherState;
  sortDispatch: SortTransactionDispatch | SortVoucherDispatch;
  sortDescriptions: string[];
};
export default function SortModal({
  type,
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

        <PaddedScrollView alwaysBounceVertical={false}>
          <H4CardNavTab>{`Sort ${type} by`}</H4CardNavTab>
          <SortVerticalSpacing />
          <RadioButton
            data={sortDescriptions}
            selected={sortState.inProgressSortType}
            setSelected={(index: number) => {
              sortDispatch({ type: 'SORT_BY', option: index });
            }}
          />

          <SortVerticalSpacing />
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
