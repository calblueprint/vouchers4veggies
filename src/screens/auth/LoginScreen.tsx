import React, { useState } from 'react';
import { ButtonMagenta, SafeArea } from '../../../assets/Components';
import {
  Body1Text,
  H2Heading,
  H4CardNavTab,
  WhiteText,
} from '../../../assets/Fonts';
import InputField from '../../components/auth/InputField';
import { AuthStackScreenProps } from '../../navigation/types';
import { setAuthErrorMessage, signIn } from '../../utils/authUtils';

import { useAuthContext } from './AuthContext';
// import {
//   validateEmailInput,
//   validatePasswordInput,
// } from '../../utils/validationUtils';
import StandardHeader from '../../components/common/StandardHeader';

import {
  FormContainer,
  HeadingContainer,
  RowContainer,
  Styles,
  VerticalSpacingButtonContainer,
} from './styles';
import BackButton from '../../components/common/BackButton';
import {
  LeftAlignContainer,
  RightAlignContainer,
} from '../../components/common/styles';

export default function LoginScreen({
  navigation,
}: AuthStackScreenProps<'Login'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { errorMessage, dispatch } = useAuthContext();

  const handleSignIn = async () => {
    if (email && password) {
      await signIn(dispatch, { email, password });
    } else {
      setAuthErrorMessage(dispatch, 'Please enter your email and password.');
    }
    setShowErrorMessage(true);
  };

  const onChangeEmail = (value: string) => {
    setShowErrorMessage(false);
    setEmail(value);
  };

  const onChangePassword = (value: string) => {
    setShowErrorMessage(false);
    setPassword(value);
  };

  const resetPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeArea>
      <StandardHeader>
        <BackButton onPress={() => navigation.goBack()} />
      </StandardHeader>

      <FormContainer>
        <HeadingContainer>
          <H2Heading>Welcome back!</H2Heading>
        </HeadingContainer>

        <Body1Text style={Styles.bold}>Email</Body1Text>
        <InputField
          onChange={onChangeEmail}
          value={email}
          placeholder="Enter email"
          // validate={validateEmailInput}
          keyboardType="email-address"
        />

        <RowContainer>
          <LeftAlignContainer>
            <Body1Text style={Styles.bold}>Password</Body1Text>
          </LeftAlignContainer>
          <RightAlignContainer>
            <Body1Text style={Styles.underline} onPress={resetPassword}>
              Forgot password?
            </Body1Text>
          </RightAlignContainer>
        </RowContainer>
        <InputField
          onChange={onChangePassword}
          value={password}
          placeholder="Enter password"
          secureTextEntry
          // validate={validatePasswordInput}
        />
        {showErrorMessage && errorMessage && (
          <Body1Text style={Styles.errorText}>{errorMessage}</Body1Text>
        )}
        <VerticalSpacingButtonContainer>
          <ButtonMagenta onPress={handleSignIn}>
            <WhiteText>
              <H4CardNavTab>Login</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </VerticalSpacingButtonContainer>
      </FormContainer>
    </SafeArea>
  );
}
