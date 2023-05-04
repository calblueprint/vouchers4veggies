import React from 'react';
import Modal from 'react-native-modal';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  SortModalContainer,
  styles,
  ButtonMagentaContainer,
  PaddedScrollView,
  ModalHeader,
} from './styles';
import { ButtonTextWhite, H4CardNavTab } from '../../../assets/Fonts';
import RadioButton from './RadioButtonComponent';
import { SortDispatch, SortState } from '../../utils/transactionUtils';
import {
  ButtonMagenta,
  LeftAlignContainer,
  RightAlignContainer,
} from '../../../assets/Components';
import ClearButton from './ClearButton';
import Colors from '../../../assets/Colors';

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
  const onClearSort = () => sortDispatch({ type: 'CLEAR_SORT' });

  const onCloseModal = () => {
    setIsVisible(false);
    sortDispatch({ type: 'RESET_IN_PROGRESS' });
  };

  const onSetSelected = (index: number) => {
    sortDispatch({ type: 'SORT_BY', option: index });
  };

  const onSubmitSort = () => {
    setIsVisible(false);
    sortDispatch({ type: 'ON_SUBMIT' });
  };

  return (
    <Modal
      isVisible={isVisible}
      coverScreen={false}
      style={styles.modal}
      backdropTransitionOutTiming={0}
    >
      <SortModalContainer>
        <ModalHeader>
          <LeftAlignContainer>
            <ClearButton
              isDisabled={
                !sortState.isActive && sortState.inProgressSortType === -1
              }
              onPress={onClearSort}
            />
          </LeftAlignContainer>
          <RightAlignContainer>
            <TouchableOpacity onPress={onCloseModal}>
              <Icon name="close" size={24} color={Colors.midBlack} />
            </TouchableOpacity>
          </RightAlignContainer>
        </ModalHeader>

        <PaddedScrollView alwaysBounceVertical={false}>
          <H4CardNavTab
            style={styles.bottomSpacing}
          >{`Sort ${name} by`}</H4CardNavTab>
          <View style={styles.bottomSpacing}>
            <RadioButton
              data={sortDescriptions}
              selected={sortState.inProgressSortType}
              setSelected={onSetSelected}
            />
          </View>

          <ButtonMagentaContainer>
            <ButtonMagenta onPress={onSubmitSort}>
              <ButtonTextWhite>Apply</ButtonTextWhite>
            </ButtonMagenta>
          </ButtonMagentaContainer>
        </PaddedScrollView>
      </SortModalContainer>
    </Modal>
  );
}
