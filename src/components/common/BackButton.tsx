import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';
import { RootNavBackButton } from '../../../assets/Components';
import { DarkGrayText } from '../../../assets/Fonts';

export const BackButtonContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
`;

export default function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <BackButtonContainer>
      <RootNavBackButton onPress={onPress}>
        <DarkGrayText>
          <Icon name="left" size={14} color={Colors.darkGray} /> Back
        </DarkGrayText>
      </RootNavBackButton>
    </BackButtonContainer>
  );
}
