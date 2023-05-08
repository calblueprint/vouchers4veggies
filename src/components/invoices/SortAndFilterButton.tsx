import React from 'react';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { SortAndFilterBase, styles } from './styles';
import { Body2Subtext, MagentaText } from '../../../assets/Fonts';
import { CenteredRow } from '../../../assets/Components';
import Colors from '../../../assets/Colors';

type SortAndFilterButtonProps = {
  modalIsVisible: boolean;
  setModalIsVisible: (visibility: boolean) => void;
  isSelected: boolean;
  type: 'sort' | 'filter';
  title: string;
  width?: string | number;
};
export default function SortAndFilterButton({
  modalIsVisible,
  setModalIsVisible,
  isSelected,
  type,
  title,
  width = 146,
}: SortAndFilterButtonProps) {
  const onPress = () => setModalIsVisible(true);

  let iconColor = Colors.midBlack;
  if (isSelected) {
    iconColor = Colors.magenta;
  }

  let icon = (
    <MaterialIcons
      name="tune"
      size={16}
      color={iconColor}
      style={styles.icon}
    />
  );
  if (type === 'sort') {
    icon = (
      <Octicons
        name="sort-desc"
        size={16}
        color={iconColor}
        style={styles.icon}
      />
    );
  }

  return (
    <SortAndFilterBase
      isSelected={isSelected || modalIsVisible}
      onPress={onPress}
      style={{ width }}
    >
      <CenteredRow>
        {icon}
        <Body2Subtext>
          {isSelected || modalIsVisible ? (
            <MagentaText>{title}</MagentaText>
          ) : (
            title
          )}
        </Body2Subtext>
      </CenteredRow>
    </SortAndFilterBase>
  );
}
