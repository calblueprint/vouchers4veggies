import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { z } from 'zod';
import Colors from '../../../assets/Colors';
import { ButtonMagenta, RootNavBackButton } from '../../../assets/Components';
import { Body1Text, H2Heading, H4CardNavTab } from '../../../assets/Fonts';
import InputField from '../../components/InputField/InputField';
import { AuthStackScreenProps } from '../../navigation/types';
import { setAuthErrorMessage, signIn } from '../../utils/authUtils';

import { useAuthContext } from './AuthContext';

import {
  BackButtonContainer,
  DarkGrayText,
  FormContainer,
  HeadingContainer,
  LeftAlignContainer,
  LoginContainer,
  RightAlignContainer,
  RowContainer,
  SmallTextContainer,
  Styles,
  VerticalSpacingButtonContainer,
  WhiteText,
} from './styles';

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

  const validateEmailInput = () => {
    if (email !== '') {
      const emailSchema = z.string().email();
      emailSchema.parse(email);
    }
  };

  const validatePasswordInput = () => {
    if (password !== '') {
      const passwordSchema = z.string().min(1);
      passwordSchema.parse(password);
    }
  };

  const resetPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <LoginContainer>
      <BackButtonContainer>
        <RootNavBackButton onPress={() => navigation.navigate('Start')}>
          <DarkGrayText>
            <Icon name="left" size={14} color={Colors.darkGray} /> Back
          </DarkGrayText>
        </RootNavBackButton>
      </BackButtonContainer>

      <FormContainer>
        <HeadingContainer>
          <H2Heading>Welcome back!</H2Heading>
        </HeadingContainer>

        <Body1Text style={Styles.bold}>Email</Body1Text>
        <InputField
          onChange={onChangeEmail}
          value={email}
          placeholder="Enter email"
          validate={validateEmailInput}
          inputMode="email-address"
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
          validate={validatePasswordInput}
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

        <SmallTextContainer>
          <Body1Text>
            {`Don't have an account? `}
            <Body1Text style={Styles.underline}>Sign up.</Body1Text>
          </Body1Text>
        </SmallTextContainer>
      </FormContainer>
    </LoginContainer>
  );
}
