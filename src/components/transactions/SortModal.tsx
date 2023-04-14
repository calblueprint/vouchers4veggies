import React from 'react';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import {
  CenteredContainer,
  CloseButtonContainer,
  SortModalTextContainer,
  Styles,
  VerticalSpaceContainer,
} from './styles';
import { BlueText, Body1Text, H4CardNavTab } from '../../../assets/Fonts';
import RadioButton from '../common/RadioButton';

type SortModalProps = {
  isVisible: boolean;
  setIsVisible: (visibility: boolean) => void;
  sortType: number;
  setSortType: (n: number) => void;
  sortOptions: string[];
};
export default function SortModal({
  isVisible,
  setIsVisible,
  sortType,
  setSortType,
  sortOptions,
}: SortModalProps) {
  return (
    <Modal isVisible={isVisible} coverScreen={false} style={Styles.modal}>
      <SortModalTextContainer>
        <CloseButtonContainer>
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <BlueText>
              <Body1Text>Close</Body1Text>
            </BlueText>
          </TouchableOpacity>
        </CloseButtonContainer>

        <VerticalSpaceContainer />
        <CenteredContainer>
          <H4CardNavTab>Sort invoices by</H4CardNavTab>
        </CenteredContainer>
        <VerticalSpaceContainer />
        <RadioButton
          data={sortOptions}
          selected={sortType}
          setSelected={setSortType}
        />
      </SortModalTextContainer>
    </Modal>
  );
}
