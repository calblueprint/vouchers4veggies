import styled from 'styled-components/native';
import Colors from './Colors';

export const H1Heading = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 36px;
  line-height: 49px;
`;

export const H2Heading = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 30px;
  line-height: 41px;
  flex-wrap: wrap;
`;

export const TitleText = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 28px;
  line-height: 38px;
`;

export const H3Subheading = styled.Text`
  font-family: 'manrope-medium';
  font-style: normal;
  font-size: 24px;
  line-height: 33px;
`;

export const H4Subheading = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 20px;
  line-height: 27px;
`;

export const H4SubheadingSemibold = styled(H4Subheading)`
  font-family: 'manrope-semiBold';
`;

export const H4CardNavTab = styled.Text`
  font-family: 'manrope-semiBold';
  font-style: normal;
  font-size: 18px;
  line-height: 25px;
`;

export const H5Subheading2 = styled.Text`
  font-family: 'manrope-semiBold';
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
`;

export const Body1Text = styled.Text`
  font-family: 'manrope-regular';
  font-style: normal;
  font-size: 14px;
  line-height: 19px;
`;

export const Body1TextSemibold = styled(Body1Text)`
  font-family: 'manrope-semiBold';
`;

export const Body2Subtext = styled.Text`
  font-family: 'manrope-regular';
  font-style: normal;
  font-size: 12px;
  line-height: 14px;
`;

export const Body2SubtextSemibold = styled(Body2Subtext)`
  font-family: 'manrope-semiBold';
`;

export const CounterText = styled.Text`
  font-family: 'manrope-bold';
  font-style: normal;
  font-size: 16px;
`;

export const NavButtonText = styled.Text`
  text-align: center;
  padding-vertical: 11px;
  font-size: 14px;
  color: ${Colors.darkGray};
  font-family: manrope-bold;
`;

export const LoadingText = styled.Text`
  font-family: 'manrope-semiBold';
  font-style: normal;
  font-size: 18px;
  line-height: 25px;
  color: ${Colors.magenta};
`;

const ButtonText = styled.Text`
  font-family: 'manrope-semiBold';
  font-style: normal;
  font-size: 18px;
  line-height: 25px;
`;

export const ButtonTextWhite = styled(ButtonText)`
  color: ${Colors.offWhite};
`;

export const ButtonTextBlack = styled(ButtonText)`
  color: ${Colors.midBlack};
`;

export const ButtonTextMagenta = styled(ButtonText)`
  color: ${Colors.magenta};
`;

export const WhiteText = styled.Text`
  color: ${Colors.offWhite};
`;

export const DarkGrayText = styled.Text`
  color: ${Colors.darkGray};
`;

export const MidGrayText = styled.Text`
  color: ${Colors.midGray};
`;

export const BlueText = styled.Text`
  color: ${Colors.blue};
`;

export const MagentaText = styled.Text`
  color: ${Colors.magenta};
`;

export const RedText = styled.Text`
  color: ${Colors.alertRed};
`;

export const GreenText = styled.Text`
  color: ${Colors.alertGreen};
`;

export const CenterText = styled.Text`
  text-align: center;
`;
