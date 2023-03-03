import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {
  SuccessText,
  ErrorText,
  Body1Text,
  H2Heading,
  H4CardNavTab,
  Bold,
} from '../../../assets/Fonts';
import { ButtonMagenta } from '../../../assets/Components';
import InputField from '../../components/InputField/InputField';

import { forgotPassword } from '../../utils/authUtils';

import { useAuthContext } from './AuthContext';

import {
  FormContainer,
  HeadingContainer,
  LoginContainer,
  LogoContainer,
  VerticalSpacingButtonContainer,
  WhiteText,
  RowContainer,
  BottomMargin,
} from './styles';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { errorMessage, successMessage, dispatch } = useAuthContext();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const handleSendEmail = async () => {
    await forgotPassword(dispatch, { email });
    setShowErrorMessage(true);
    setShowSuccessMessage(true);
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
          <Body1Text>
            <BottomMargin>
              Enter the email associated with your account, and we will send an
              email with instructions to reset your password.
            </BottomMargin>
          </Body1Text>
        </RowContainer>

        <Body1Text>
          <Bold>Email</Bold>
        </Body1Text>
        <InputField
          onChange={onChangeEmail}
          value={email}
          placeholder="Enter email"
        />
        {showErrorMessage && errorMessage && (
          <Body1Text>
            <ErrorText>We could not find that email address!</ErrorText>
          </Body1Text>
        )}
        {showSuccessMessage && successMessage && (
          <Body1Text>
            <SuccessText>Email sent! Check your inbox to reset.</SuccessText>
          </Body1Text>
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
