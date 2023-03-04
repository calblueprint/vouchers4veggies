import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {
  SuccessText,
  ErrorText,
  Body1Text,
  H2Heading,
  H4CardNavTab,
  BoldText,
} from '../../../assets/Fonts';
import { ButtonMagenta } from '../../../assets/Components';
import InputField from '../../components/InputField/InputField';
import StandardLogo from '../../components/common/StandardLogo';
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
  Header,
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
      <Header>
        <StandardLogo />
      </Header>

      <FormContainer>
        <HeadingContainer>
          <H2Heading>Reset Password</H2Heading>
        </HeadingContainer>

        <RowContainer>
          <BottomMargin>
            <Body1Text>
              Enter the email associated with your account, and we will send an
              email with instructions to reset your password.
            </Body1Text>
          </BottomMargin>
        </RowContainer>

        <Body1Text>
          <BoldText>Email</BoldText>
        </Body1Text>
        <InputField
          onChange={onChangeEmail}
          value={email}
          placeholder="Enter email"
        />
        {showErrorMessage && errorMessage ? (
          <Body1Text>
            <ErrorText>We could not find that email address!</ErrorText>
          </Body1Text>
        ) : null}
        {showSuccessMessage && successMessage ? (
          <Body1Text>
            <SuccessText>Email sent! Check your inbox to reset.</SuccessText>
          </Body1Text>
        ) : null}
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
