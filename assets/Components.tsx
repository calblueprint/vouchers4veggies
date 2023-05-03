import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const SafeArea = styled(SafeAreaView)`
  background-color: ${Colors.offWhite};
  width: 100%;
  min-height: 100%;
  align-items: center;
  flex: 1;
`;

const ButtonBase = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-width: 2px;
  border-radius: 5px;
  width: 277px;
  padding: 9px;
  margin-bottom: 16px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

export const ButtonMagenta = styled(ButtonBase)`
  background: ${Colors.magenta};
  border-color: ${Colors.magenta};
`;

export const ButtonWhite = styled(ButtonBase)`
  background: ${Colors.offWhite};
  border-color: ${Colors.magenta};
`;

export const TitleContainer = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 32px;
  margin-right: 32px;
  justify-content: center;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const CenteredRow = styled(Row)`
  justify-content: center;
`;

export const SelectableRow = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const LeftAlignContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
`;

export const RightAlignContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`;

export const StartOfListView = styled.View`
  width: 100%;
  height: 1px;
  border: 1px solid ${Colors.lightGray};
`;

export const Card = styled.View`
  display: flex;
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

export const styles = StyleSheet.create({
  fieldDefault: {
    borderWidth: 1,
    height: 35,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: '3%',
    marginBottom: '4%',
    borderRadius: 5,
    borderColor: Colors.midGray,
    backgroundColor: Colors.lightGray,
  },
  isFocused: {
    borderColor: Colors.magenta,
    backgroundColor: Colors.offWhite,
  },
  isInvalid: {
    borderColor: Colors.alertRed,
    backgroundColor: Colors.alertLightRed,
  },
});

export const fieldFocused = StyleSheet.compose(
  styles.fieldDefault,
  styles.isFocused,
);

export const fieldIsInvalid = StyleSheet.compose(
  styles.fieldDefault,
  styles.isInvalid,
);
