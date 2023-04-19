import React from 'react';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import {
  CenteredContainer,
  CenteredTextContainer,
  SelectedSortAndFilterBase,
  Styles,
  UnselectedSortAndFilterBase,
} from './styles';
import { Body2Subtext, MagentaText } from '../../../assets/Fonts';
import { OneLine } from '../common/styles';
import Colors from '../../../assets/Colors';

type SortAndFilterButtonProps = {
  modalIsVisible: boolean;
  setModalIsVisible: (visibility: boolean) => void;
  isSelected: boolean;
  type: 'sort' | 'filter';
  text: string;
};
export default function SortAndFilterButton({
  modalIsVisible,
  setModalIsVisible,
  isSelected,
  type,
  text,
}: SortAndFilterButtonProps) {
  let iconColor = Colors.midBlack;
  if (isSelected) {
    iconColor = Colors.magenta;
  }

  let icon = (
    <MaterialIcons
      name="tune"
      size={16}
      color={iconColor}
      style={Styles.icon}
    />
  );
  if (type === 'sort') {
    icon = (
      <Octicons
        name="sort-desc"
        size={16}
        color={iconColor}
        style={Styles.icon}
      />
    );
  }

  if (isSelected || modalIsVisible) {
    return (
      <SelectedSortAndFilterBase onPress={() => setModalIsVisible(true)}>
        <CenteredContainer>
          <CenteredTextContainer>
            <OneLine>
              {icon}
              <MagentaText>
                <Body2Subtext>{text}</Body2Subtext>
              </MagentaText>
            </OneLine>
          </CenteredTextContainer>
        </CenteredContainer>
      </SelectedSortAndFilterBase>
    );
  }
  return (
    <UnselectedSortAndFilterBase onPress={() => setModalIsVisible(true)}>
      <CenteredContainer>
        <CenteredTextContainer>
          <OneLine>
            {icon}
            <Body2Subtext>{text}</Body2Subtext>
          </OneLine>
        </CenteredTextContainer>
      </CenteredContainer>
    </UnselectedSortAndFilterBase>
  );
}
