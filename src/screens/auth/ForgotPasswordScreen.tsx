import React, { useState } from 'react';
import {
  GreenText,
  RedText,
  Body1Text,
  H2Heading,
  H4CardNavTab,
  WhiteText,
  Body1TextSemibold,
} from '../../../assets/Fonts';
import {
  ButtonMagenta,
  SafeArea,
  TitleContainer,
} from '../../../assets/Components';
import InputField from '../../components/auth/InputField';
import { AuthStackScreenProps } from '../../navigation/types';
import { forgotPassword } from '../../utils/authUtils';
import StandardHeader from '../../components/common/StandardHeader';
import { useAuthContext } from './AuthContext';
import { ButtonContainer, BodyContainer, TextContainer } from './styles';
import BackButton from '../../components/common/BackButton';

export default function ForgotPasswordScreen({
  navigation,
}: AuthStackScreenProps<'ForgotPassword'>) {
  const [email, setEmail] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { errorMessage, successMessage, dispatch } = useAuthContext();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onPressBackButton = () => navigation.goBack();

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const handleSendEmail = async () => {
    await forgotPassword(dispatch, { email });
    setShowErrorMessage(true);
    setShowSuccessMessage(true);
  };

  return (
    <SafeArea>
      <StandardHeader>
        <BackButton onPress={onPressBackButton} />
      </StandardHeader>

      <BodyContainer>
        <TitleContainer>
          <H2Heading>Reset Password</H2Heading>
        </TitleContainer>

        <TextContainer>
          <Body1Text>
            Enter the email associated with your account, and we will send an
            email with instructions to reset your password.
          </Body1Text>
        </TextContainer>

        <Body1TextSemibold>Email</Body1TextSemibold>
        <InputField
          onChange={onChangeEmail}
          value={email}
          placeholder="Enter email"
        />
        <Body1Text>
          {showErrorMessage && errorMessage && (
            <RedText>We could not find that email address!</RedText>
          )}
          {showSuccessMessage && successMessage && (
            <GreenText>Email sent! Check your inbox to reset.</GreenText>
          )}
        </Body1Text>

        <ButtonContainer>
          <ButtonMagenta onPress={handleSendEmail}>
            <WhiteText>
              <H4CardNavTab>Send email</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </ButtonContainer>
      </BodyContainer>
    </SafeArea>
  );
}
