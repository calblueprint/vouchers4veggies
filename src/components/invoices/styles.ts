import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';
import { SelectionProps } from '../../types/types';
import { Row } from '../../../assets/Components';

export const FilterFieldBase = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-start;
  border-radius: 8px;
  background: ${Colors.offWhite};
  padding-vertical: 8px;
  padding-horizontal: 15px;
  border: 1px solid
    ${(props: SelectionProps) =>
      props.isSelected ? Colors.midBlack : Colors.unselectedGray};
`;

export const FilterTagBase = styled.TouchableOpacity`
  align-items: flex-start;
  border-radius: 24px;
  background: ${(props: SelectionProps) =>
    props.isSelected ? Colors.midBlack : Colors.offWhite};
  padding-vertical: 8px;
  border: 1px solid
    ${(props: SelectionProps) =>
      props.isSelected ? Colors.midBlack : Colors.unselectedGray};
`;

const ModalContainer = styled.View`
  background: ${Colors.offWhite};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const SortModalContainer = styled(ModalContainer)`
  max-height: 55%;
`;

export const FilterModalContainer = styled(ModalContainer)`
  max-height: 75%;
`;

export const ModalHeader = styled(Row)`
  margin-top: 19px;
  margin-bottom: 21px;
  padding-horizontal: 29px;
`;

export const SubheadingContainer = styled(Row)`
  margin-top: 38px;
  margin-bottom: 9px;
`;

export const DatePickerContainer = styled.View`
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  background-color: ${Colors.midGray};
  align-items: center;
  justify-content: center;
`;

export const PaddedScrollView = styled.ScrollView`
  padding-horizontal: 29px;
`;

export const ButtonMagentaContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

export const RadioButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  margin-horizontal: 10px;
`;

export const RadioButtonBase = styled.View`
  height: 22px;
  width: 22px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${(props: SelectionProps) =>
    props.isSelected ? Colors.magenta : Colors.midGray};
  align-items: center;
  justify-content: center;
`;

export const RadioButtonFill = styled.View`
  height: 14px;
  width: 14px;
  border-radius: 7px;
  background-color: ${Colors.magenta};
`;

export const SortAndFilterBase = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 146px;
  background: ${(props: SelectionProps) =>
    props.isSelected ? Colors.lightMagenta : Colors.offWhite};
  padding: 11px;
  margin: 12px;
  border: 1px solid
    ${(props: SelectionProps) =>
      props.isSelected ? Colors.magenta : Colors.midGray};
  margin-bottom: 28px;
`;

const StatusComponentBase = styled.View`
  text-align: center;
  align-items: center;
  border-radius: 9px;
  min-width: 63px;
  padding: 9px;
`;

export const StatusComponentRed = styled(StatusComponentBase)`
  background: ${Colors.alertLightRed};
  border: 2px solid ${Colors.alertLightRed};
`;

export const StatusComponentGreen = styled(StatusComponentBase)`
  background: ${Colors.lightGreen};
  border: 2px solid ${Colors.lightGreen};
`;

export const StatusContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  margin-right: 30px;
`;

export const ValueContainer = styled.View`
  flex: 1.5;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-horizontal: 10px;
`;

export const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  bringToTop: {
    zIndex: 5,
  },
  rightSpacing: {
    marginRight: 20,
  },
  topSpacing: {
    marginTop: 22,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    width: '100%',
  },
});
