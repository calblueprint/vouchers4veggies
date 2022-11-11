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
