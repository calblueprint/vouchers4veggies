import React from 'react';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import {
  SelectedSortAndFilterBase,
  Styles,
  UnselectedSortAndFilterBase,
} from './styles';
import { Body2Subtext, MagentaText } from '../../../assets/Fonts';
import { CenteredOneLine } from '../common/styles';
import Colors from '../../../assets/Colors';

type SortAndFilterButtonProps = {
  modalIsVisible: boolean;
  setModalIsVisible: (visibility: boolean) => void;
  isSelected: boolean;
  type: 'sort' | 'filter';
  text: string;
  style?: object;
};
export default function SortAndFilterButton({
  modalIsVisible,
  setModalIsVisible,
  isSelected,
  type,
  text,
  style = {},
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
      <SelectedSortAndFilterBase
        onPress={() => setModalIsVisible(true)}
        style={style}
      >
        <CenteredOneLine>
          {icon}
          <MagentaText>
            <Body2Subtext>{text}</Body2Subtext>
          </MagentaText>
        </CenteredOneLine>
      </SelectedSortAndFilterBase>
    );
  }
  return (
    <UnselectedSortAndFilterBase
      onPress={() => setModalIsVisible(true)}
      style={style}
    >
      <CenteredOneLine>
        {icon}
        <Body2Subtext>{text}</Body2Subtext>
      </CenteredOneLine>
    </UnselectedSortAndFilterBase>
  );
}
