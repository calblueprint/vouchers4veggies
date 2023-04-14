import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

export const TitleContainer = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 42px;
  line-height: 57px;
  text-align: center;
`;

export const LeftAlignedContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 29px;
  margin-bottom: 13px;
`;

export const MediumText = styled.Text`
  font-family: 'manrope-regular';
  font-style: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
`;

export const Size14BoldText = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
`;

export const SortAndFilterButton = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-radius: 5px;
  width: 146px;
  background: white;
  padding: 11px;
  margin: 12px;
  border: 1px solid ${Colors.midGray};
  margin-bottom: 28px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

export const OneLine = styled.View`
  display: flex;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const RightAlignContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  margin-top: 19px;
`;

export const SortModalTextContainer = styled.View`
  padding-right: 29px;
  padding-left: 29px;
  background: ${Colors.offWhite};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: 395px;
`;
export const FilterModalTextContainer = styled.View`
  padding-right: 29px;
  padding-left: 29px;
  background: ${Colors.offWhite};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: 510px;
`;

export const VerticalSpaceContainer = styled.View`
  height: 21px;
`;

export const CenteredContainer = styled.Text`
  text-align: center;
  align-content: center;
  justify-content: center;
`;

export const DatePickerButton = styled.TouchableOpacity`
  text-align: center;
  align-items: center;
  border-radius: 5px;
  width: 146px;
  background: white;
  padding: 11px;
  margin: 12px;
  border: 1px solid ${Colors.midGray};
  margin-bottom: 28px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

export const Styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 6,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    width: '100%',
  },
});
