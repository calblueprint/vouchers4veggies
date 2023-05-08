import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import Colors from '../../../assets/Colors';
import { DarkGrayText } from '../../../assets/Fonts';

const BackButtonContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
`;

const RootNavBackButton = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  padding: 9px 18px 9px 0px;
`;

type BackButtonProps = {
  onPress: () => void;
};

export default function BackButton({ onPress }: BackButtonProps) {
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
