import React, { useState } from 'react';
import {
  ButtonMagenta,
  SafeArea,
  LeftAlignContainer,
  RightAlignContainer,
  Row,
  TitleContainer,
} from '../../../assets/Components';
import {
  Body1TextSemibold,
  Body1Text,
  H2Heading,
  H4CardNavTab,
  RedText,
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
import { ButtonContainer, BodyContainer, styles } from './styles';
import BackButton from '../../components/common/BackButton';

export default function LoginScreen({
  navigation,
}: AuthStackScreenProps<'Login'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { errorMessage, dispatch } = useAuthContext();

  const onPressBackButton = () => navigation.goBack();

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
        <BackButton onPress={onPressBackButton} />
      </StandardHeader>

      <BodyContainer>
        <TitleContainer>
          <H2Heading>Welcome back!</H2Heading>
        </TitleContainer>

        <Body1TextSemibold>Email</Body1TextSemibold>
        <InputField
          onChange={onChangeEmail}
          value={email}
          placeholder="Enter email"
          // validate={validateEmailInput}
          keyboardType="email-address"
        />

        <Row>
          <LeftAlignContainer>
            <Body1TextSemibold>Password</Body1TextSemibold>
          </LeftAlignContainer>
          <RightAlignContainer>
            <Body1Text style={styles.underline} onPress={resetPassword}>
              Forgot password?
            </Body1Text>
          </RightAlignContainer>
        </Row>
        <InputField
          onChange={onChangePassword}
          value={password}
          placeholder="Enter password"
          secureTextEntry
          // validate={validatePasswordInput}
        />
        <Body1Text>
          {showErrorMessage && errorMessage && (
            <RedText>{errorMessage}</RedText>
          )}
        </Body1Text>
        <ButtonContainer>
          <ButtonMagenta onPress={handleSignIn}>
            <WhiteText>
              <H4CardNavTab>Login</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </ButtonContainer>
      </BodyContainer>
    </SafeArea>
  );
}
