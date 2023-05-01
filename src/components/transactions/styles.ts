import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';
import { CustomProps, LeftAlignContainer } from '../common/styles';

export const LeftAlignColumn = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  margin-left: 29px;
`;

export const SubheadingContainer = styled.View`
  margin-top: 38px;
  margin-bottom: 9px;
`;

export const StatusContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
  margin-right: 30px;
`;

export const ValueContainer = styled.View`
  flex: 1.5;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const StatusComponentRed = styled.View`
  text-align: center;
  align-items: center;
  border-radius: 9px;
  min-width: 63px;
  background: ${Colors.alertLightRed};
  padding: 6px;
  border: 2px solid ${Colors.alertLightRed};
`;

export const StatusComponentGreen = styled.View`
  text-align: center;
  align-items: center;
  border-radius: 9px;
  min-width: 63px;
  background: ${Colors.lightGreen};
  padding: 9px;
  border: 2px solid ${Colors.lightGreen};
`;

export const H4Subheading = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 20px;
  line-height: 27px;
`;

export const GreenText = styled.Text`
  color: ${Colors.alertGreen};
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 12px;
  line-height: 14px;
`;

export const RedText = styled.Text`
  color: ${Colors.alertRed};
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 12px;
  line-height: 14px;
`;

export const FilterFieldBase = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-start;
  border-radius: 8px;
  background: ${Colors.offWhite};
  padding-vertical: 8px;
  padding-horizontal: 15px;
  border: 1px solid
    ${(props: CustomProps) =>
      props.isSelected ? Colors.midBlack : Colors.unselectedGray};
`;

export const FilterTagBase = styled.TouchableOpacity`
  align-items: flex-start;
  border-radius: 24px;
  background: ${(props: CustomProps) =>
    props.isSelected ? Colors.midBlack : Colors.offWhite};
  padding-vertical: 8px;
  border: 1px solid
    ${(props: CustomProps) =>
      props.isSelected ? Colors.midBlack : Colors.unselectedGray};
`;

export const ClearButtonBase = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
`;

export const SortModalContainer = styled.View`
  background: ${Colors.offWhite};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  max-height: 50%;
`;

export const PaddedScrollView = styled.ScrollView`
  padding-right: 29px;
  padding-left: 29px;
`;

export const FilterModalContainer = styled.View`
  background: ${Colors.offWhite};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  max-height: 75%;
`;

export const CloseButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 19px;
  margin-bottom: 21px;
  margin-right: 29px;
`;

export const CenteredTextContainer = styled.Text`
  text-align: center;
`;

export const CenteredContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const SortAndFilterBase = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 146px;
  background: ${(props: CustomProps) =>
    props.isSelected ? Colors.lightMagenta : Colors.offWhite};
  padding: 11px;
  margin: 12px;
  border: 1px solid
    ${(props: CustomProps) =>
      props.isSelected ? Colors.magenta : Colors.midGray};
  margin-bottom: 28px;
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

export const ClearButtonContainer = styled(LeftAlignContainer)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  margin-top: 19px;
  margin-bottom: 21px;
  margin-left: 29px;
`;

export const Styles = StyleSheet.create({
  iconWithPadding: {
    justifyContent: 'center',
    backgroundColor: Colors.offWhite,
    paddingRight: 29,
  },
  icon: {
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    width: '100%',
  },
});
