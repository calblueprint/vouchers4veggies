import styled from 'styled-components/native';
import { createGlobalStyle } from 'styled-components';

export const Fonts = {
  'manrope-bold': require('./Manrope-Bold.ttf'),
  'manrope-extraBold': require('./Manrope-ExtraBold.ttf'),
  'manrope-extraLight': require('./Manrope-ExtraLight.ttf'),
  'manrope-light': require('./Manrope-Light.ttf'),
  'manrope-medium': require('./Manrope-Medium.ttf'),
  'manrope-regular': require('./Manrope-Regular.ttf'),
  'manrope-semiBold': require('./Manrope-SemiBold.ttf'),
};

export const H1Heading = styled.Text`
  font-family: 'manrope-regular';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 49px;
`;

export const H2Heading = styled.Text`
  font-family: 'manrope-regular';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 41px;
`;

export const H3_Subheading = styled.Text`
  font-family: 'manrope-regular';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 33px; ;
`;

export const H4_Card_Nav_Tab = styled.Text`
  font-family: 'manrope-regular';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
`;

export const Body_1_Text = styled.Text`
  font-family: 'manrope-regular';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
`;

export const Body_2_Subtext = styled.Text`
  font-family: 'manrope-regular';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
`;
