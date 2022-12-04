import { Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  H2Heading,
  H4CardNavTab,
  Body1Text,
  Body2Subtext,
} from '../../../assets/Fonts';
import InputField from '../../components/InputField/InputField';
import { ButtonMagenta } from '../../../assets/Components';
import {
  HeadingContainer,
  LoginContainer,
  LogoContainer,
  FormContainer,
  Styles,
  VerticalSpacingButtonContainer,
  RowContainer,
  LeftAlignContainer,
  WhiteText,
} from './styles';
import { setAuthErrorMessage, signUp } from '../../utils/authUtils';

import { useAuthContext } from './AuthContext';

export default function CreatePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const { errorMessage, dispatch } = useAuthContext();

  const handleSignUp = async () => {
    // TO-DO: @allisonhongberkeley write data to firebase
    // TO-DO: @allisonhongberkeley error-checking, make sure password == confirm
    if (password !== confirmPassword) {
      setAuthErrorMessage(dispatch, 'Passwords must match');
    }
    setShowError(true);
  };

  const onChangePassword = (value: string) => {
    setShowError(false);
    setPassword(value);
  };

  const onChangeConfirmPassword = (value: string) => {
    setShowError(false);
    setConfirmPassword(value);
  };

  return (
    <LoginContainer>
      {/* logo placeholder */}
      <LogoContainer>
        <View style={Styles.logoPlaceholder}></View>
      </LogoContainer>

      <FormContainer>
        <HeadingContainer>
          <H2Heading>Create a password.</H2Heading>
        </HeadingContainer>

        <RowContainer>
          <LeftAlignContainer>
            <Body1Text style={Styles.bold}>Password</Body1Text>
          </LeftAlignContainer>
        </RowContainer>

        <InputField
          onChange={onChangePassword}
          value={password}
          placeholder="Enter password"
          secureTextEntry
        />

        <RowContainer>
          <LeftAlignContainer>
            <Body1Text style={Styles.bold}>Confirm Password</Body1Text>
          </LeftAlignContainer>
        </RowContainer>

        <InputField
          onChange={onChangeConfirmPassword}
          value={confirmPassword}
          placeholder="Enter same password"
          secureTextEntry
        />

        <Body2Subtext>
          <Text>{`Password must include: \n❌ 8-20 characters \n❌ At least 1 capital letter`}</Text>
        </Body2Subtext>

        <VerticalSpacingButtonContainer>
          <ButtonMagenta onPress={handleSignUp}>
            <WhiteText>
              <H4CardNavTab>Next</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </VerticalSpacingButtonContainer>
      </FormContainer>
    </LoginContainer>
  );
}
