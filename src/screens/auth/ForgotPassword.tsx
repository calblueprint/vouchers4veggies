import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Body1Text, H2Heading, H4CardNavTab } from '../../../assets/Fonts';
import { ButtonMagenta } from '../../../assets/Components';
import InputField from '../../components/InputField/InputField';

import { setAuthErrorMessage, forgotPassword } from '../../utils/authUtils';

import { useAuthContext } from './AuthContext';

import {
  FormContainer,
  HeadingContainer,
  LoginContainer,
  LogoContainer,
  VerticalSpacingButtonContainer,
  WhiteText,
  RowContainer,
  Styles,
} from './styles';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { errorMessage, dispatch } = useAuthContext();

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const handleSendEmail = async () => {
    if (email) {
      await forgotPassword(dispatch, { email });
    } else {
      setAuthErrorMessage(dispatch, 'Please enter your email and password.');
    }
    setShowErrorMessage(true);
  };

  return (
    <LoginContainer>
      {/* logo placeholder */}
      <LogoContainer>
        <View style={{ backgroundColor: 'black', width: 50, height: 59.29 }}>
          <Text style={{ color: 'white' }}>{`\n  Logo`}</Text>
        </View>
      </LogoContainer>

      <FormContainer>
        <HeadingContainer>
          <H2Heading>Reset Password</H2Heading>
        </HeadingContainer>

        <RowContainer>
          <Body1Text style={Styles.bottomMargin}>
            Enter the email associated with your account, and we will send an
            email with instructions to reset your password.
          </Body1Text>
        </RowContainer>

        <Body1Text style={Styles.bold}>Email</Body1Text>
        <InputField
          onChange={onChangeEmail}
          value={email}
          placeholder="Enter email"
        />
        {showErrorMessage && errorMessage && (
          <Body1Text style={Styles.errorText}>{errorMessage}</Body1Text>
        )}
        <VerticalSpacingButtonContainer>
          <ButtonMagenta onPress={handleSendEmail}>
            <WhiteText>
              <H4CardNavTab>Send email</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </VerticalSpacingButtonContainer>
      </FormContainer>
    </LoginContainer>
  );
}
