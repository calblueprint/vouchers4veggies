import styled from 'styled-components/native';
import Colors from './Colors';

// TODO: @oahnh fix static widths
export const ButtonMagenta = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-width: 2px;
  border-radius: 5px;
  width: 277px;
  background: ${Colors.magenta};
  text-color: white;
  padding: 9px 9px;
  border-color: ${Colors.magenta};
  margin-bottom: 16px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

export const ButtonGray = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-radius: 5px;
  width: 277px;
  background: ${Colors.midGray};
  padding: 9px 9px;
  border: 2px solid ${Colors.midGray};
`;

export const ButtonWhite = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-radius: 5px;
  width: 277px;
  background: white;
  padding: 9px 9px;
  border: 2px solid ${Colors.magenta};
  margin-bottom: 16px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

export const AddManuallyButton = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 129px;
  height: 28px;
  background: ${Colors.lightMagenta};
  border: 0.828025px solid ${Colors.lightGray};
  border-radius: 17.8025px;
`;

export const InputField = styled.TextInput`
  font-style: 'normal';
  border: 1px solid ${Colors.midGray};
  background: ${Colors.lightGray};
  border-radius: 5px;
  padding: 8px;
  width: 277px;
`;

export const LargeInputField = styled.TextInput`
  font-size: 18px;
  font-style: 'normal';
  border: 1px solid ${Colors.midGray};
  background: ${Colors.offWhite};
  border-radius: 5px;
  padding: 10px;
  width: 317px;
`;

export const RootNavBackButton = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  width: 70px;
  padding: 9px;
`;

export const Row = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 67px;
  border: 0px solid ${Colors.lightGray};
  border-bottom-width: 1px;
  width: 100%;
`;

export const CardContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
