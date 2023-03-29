import React, { useState } from 'react';
import {
  SuccessText,
  ErrorText,
  Body1Text,
  H2Heading,
  H4CardNavTab,
  BoldText,
  WhiteText,
} from '../../../assets/Fonts';
import { ButtonMagenta, SafeArea } from '../../../assets/Components';
import InputField from '../../components/InputField/InputField';
import { AuthStackScreenProps } from '../../navigation/types';
import { forgotPassword } from '../../utils/authUtils';
import StandardHeader from '../../components/common/StandardHeader';
import { useAuthContext } from './AuthContext';
import {
  FormContainer,
  HeadingContainer,
  VerticalSpacingButtonContainer,
  VerticalSpacingContainer,
} from './styles';
import BackButton from '../../components/common/BackButton';

export default function ForgotPasswordScreen({
  navigation,
}: AuthStackScreenProps<'ForgotPassword'>) {
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
    <SafeArea>
      <StandardHeader alignment="flex-start">
        <BackButton onPress={() => navigation.goBack()} />
      </StandardHeader>

      <FormContainer>
        <HeadingContainer>
          <H2Heading>Reset Password</H2Heading>
        </HeadingContainer>

        <VerticalSpacingContainer>
          <Body1Text>
            Enter the email associated with your account, and we will send an
            email with instructions to reset your password.
          </Body1Text>
        </VerticalSpacingContainer>

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
    </SafeArea>
  );
}
