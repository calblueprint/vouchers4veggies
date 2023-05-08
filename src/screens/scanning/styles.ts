import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';
import { Row } from '../../../assets/Components';

export const VoucherCounter = styled.View`
  width: 30px;
  height: 30px;
  background: ${Colors.lightMagenta});
  border: 1px solid ${Colors.brightMagenta};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BodyContainer = styled.View`
  margin-vertical: 20px;
  width: 277px;
`;

export const ScannerContainer = styled.View`
  width: 277px;
  height: 237px;
  background: ${Colors.offWhite};
  border: 2px solid ${Colors.lightMagenta};
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
  margin-top: 20px;
`;

export const SummaryRow = styled(Row)`
  padding-horizontal: 29px;
  padding-top: 10px;
`;

export const ConstrainedHeightContainer = styled.View`
  width: 100%;
  min-height: 268px;
`;

export const ButtonMagentaContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
`;

export const ErrorContainer = styled.View`
  width: 100%;
  margin-vertical: 10px;
`;

export const LoadingContainer = styled.View`
  margin-top: 80px;
  height: 100px;
  display: flex;
  flex-drection: row;
  justify-content: flex-start;
  align-items: center;
`;

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  otpTextInputStyle: {
    borderWidth: 1,
    borderRadius: 2,
    width: 30,
    height: '95%',
  },
  otpContainerStyle: {
    marginVertical: 3,
  },
});
