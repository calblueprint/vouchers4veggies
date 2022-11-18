import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/Colors';

// refactor with global components
export const ButtonMagenta = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-width: 2px;
  border-radius: 5px;
  width: 257px;
  background: ${Colors.magenta};
  text-color: white;
  padding: 9px 9px;
  border-color: ${Colors.magenta};
`;

export const LoginContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LeftAlignedContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
`;

export const FormContainer = styled.View`
  width: 277;
  height: 50%;
`;

export const Styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
});
