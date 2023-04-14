import React from 'react';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { View } from 'react-native';
import {
  CenteredContainer,
  ClearButtonContainer,
  RightAlignContainer,
  SelectedSortAndFilterBase,
  Styles,
  UnselectedSortAndFilterBase,
} from './styles';
import {
  BlueText,
  Body1Text,
  Body2Subtext,
  MagentaText,
  MidGrayText,
} from '../../../assets/Fonts';
import { OneLine } from '../common/styles';
import Colors from '../../../assets/Colors';

type SortAndFilterButtonProps = {
  setModalIsVisible: (visibility: boolean) => void;
  isSelected: boolean;
  type: 'sort' | 'filter';
  text: string;
};
export default function SortAndFilterButton({
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

  if (isSelected) {
    return (
      <SelectedSortAndFilterBase onPress={() => setModalIsVisible(true)}>
        <CenteredContainer>
          <OneLine>
            {icon}
            <MagentaText>
              <Body2Subtext>{text}</Body2Subtext>
            </MagentaText>
          </OneLine>
        </CenteredContainer>
      </SelectedSortAndFilterBase>
    );
  }
  return (
    <UnselectedSortAndFilterBase onPress={() => setModalIsVisible(true)}>
      <CenteredContainer>
        <OneLine>
          {icon}
          <Body2Subtext>{text}</Body2Subtext>
        </OneLine>
      </CenteredContainer>
    </UnselectedSortAndFilterBase>
  );
}
