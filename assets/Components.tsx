import styled from 'styled-components/native';
import Colors from './Colors';

export const SafeArea = styled.SafeAreaView`
  background-color: ${Colors.offWhite};
  width: 100%;
  min-height: 100%;
  align-items: center;
  flex: 1;
`;

export const FullSizeContainer = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonMagenta = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-width: 2px;
  border-radius: 5px;
  width: 277px;
  background: ${Colors.magenta};
  text-color: ${Colors.offWhite};
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
  background: ${Colors.offWhite};
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
  border: 0.828025px solid ${Colors.midGray};
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
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 67px;
  border: 0px solid ${Colors.lightGray};
  border-bottom-width: 1px;
  width: 100%;
`;

export const StartOfListView = styled.View`
  width: 100%;
  height: 1px;
  border: 1px solid ${Colors.lightGray};
  border-top-width: 1px;
`;

export const CardContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TitleContainer = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 32px;
  margin-right: 32px;
  justify-content: center;
`;
