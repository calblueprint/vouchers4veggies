import React from 'react';
import Modal from 'react-native-modal';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
  CloseButtonContainer,
  SortModalTextContainer,
  Styles,
  SortVerticalSpacing,
  CenteredContainer,
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
} from '../../utils/transactionUtils';
import { ButtonMagenta } from '../../../assets/Components';

type SortModalProps = {
  isVisible: boolean;
  setIsVisible: (visibility: boolean) => void;
  sortState: SortTransactionState;
  sortDispatch: SortTransactionDispatch;
  sortDescriptions: string[];
};
export default function SortModal({
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
      <SortModalTextContainer>
        <ScrollView>
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

          <H4CardNavTab>Sort invoices by</H4CardNavTab>
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
        </ScrollView>
      </SortModalTextContainer>
    </Modal>
  );
}
