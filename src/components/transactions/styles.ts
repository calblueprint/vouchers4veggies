import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

export const LeftAlignContainerWithMargin = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  padding-left: 29px;
`;

export const RightAlignContainerWithMargin = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  margin-right: 29px;
`;

export const RightAlignContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
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

export const UnselectedFilterField = styled.TouchableOpacity`
  align-items: flex-start;
  border-radius: 8px;
  background: white;
  padding-vertical: 8px;
  padding-horizontal: 15px;
  border: 1px solid ${Colors.unselectedGray};
`;

export const SelectedFilterField = styled.TouchableOpacity`
  align-items: flex-start;
  border-radius: 8px;
  background: white;
  padding-vertical: 8px;
  padding-horizontal: 15px;
  border: 1px solid ${Colors.midBlack};
`;

export const UnselectedFilterTag = styled.TouchableOpacity`
  align-items: flex-start;
  border-radius: 24px;
  background: white;
  padding-vertical: 8px;
  border: 1px solid ${Colors.unselectedGray};
`;

export const SelectedFilterTag = styled.TouchableOpacity`
  align-items: flex-start;
  border-radius: 24px;
  background: ${Colors.midBlack};
  padding-vertical: 8px;
  border: 1px solid ${Colors.midBlack};
`;

export const ClearButtonContainer = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  background: white;
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

export const SortVerticalSpacing = styled.View`
  height: 22px;
`;

export const FilterVerticalSpacing = styled.View`
  height: 48px;
`;

export const HorizontalSpacing = styled.View`
  width: 20px;
`;

export const CloseButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  margin-top: 19px;
  margin-bottom: 9px;
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

export const UnselectedSortAndFilterBase = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 146px;
  background: white;
  padding: 11px;
  margin: 12px;
  border: 1px solid ${Colors.midGray};
  margin-bottom: 28px;
`;

export const SortAndFilterDummy = styled.View`
  width: 146px;
`;

export const SelectedSortAndFilterBase = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 146px;
  background: ${Colors.lightMagenta};
  padding: 11px;
  margin: 12px;
  border: 1px solid ${Colors.magenta};
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

export const Styles = StyleSheet.create({
  iconWithPadding: {
    justifyContent: 'center',
    backgroundColor: '#fff',
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
