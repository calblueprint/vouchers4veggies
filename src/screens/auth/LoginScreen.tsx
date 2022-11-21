import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ButtonMagenta } from '../../../assets/Components';
import { Body_1_Text, H2Heading, H4_Card_Nav_Tab } from '../../../assets/Fonts';
import { InputField } from '../../components/InputField/InputField';
import { AuthContext } from './AuthContext';

import {
  FormContainer,
  HeadingContainer,
  LeftAlignContainer,
  LoginContainer,
  LogoContainer,
  RightAlignContainer,
  RowContainer,
  SmallTextContainer,
  Styles,
  VerticalSpacingButtonContainer,
  WhiteText,
} from './styles';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { signIn, authState } = useContext(AuthContext);

  const { dispatch } = AuthContext();

  const handleSignIn = async () => signIn(dispatch, { email, password });

  useEffect(() => {
    if (authState?.errorMessage) {
      setErrorMessage(authState.errorMessage);
    }
  }, [authState]);

  const onChangeEmail = (value: string) => {
    setErrorMessage('');
    setEmail(value);
  };

  const onChangePassword = (value: string) => {
    setErrorMessage('');
    setPassword(value);
  };

  // TODO: implement password reset functionality @selene-huang
  const resetPassword = () => {
    // password flow
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
          <H2Heading>Welcome back!</H2Heading>
        </HeadingContainer>

        <Body_1_Text style={Styles.bold}>Email</Body_1_Text>
        <InputField
          onChange={onChangeEmail}
          value={email}
          placeholder="Enter email"
        />

        <RowContainer>
          <LeftAlignContainer>
            <Body_1_Text style={Styles.bold}>Password</Body_1_Text>
          </LeftAlignContainer>
          <RightAlignContainer>
            <Body_1_Text style={Styles.underline} onPress={resetPassword}>
              Forgot password?
            </Body_1_Text>
          </RightAlignContainer>
        </RowContainer>
        <InputField
          onChange={onChangePassword}
          value={password}
          placeholder="Enter password"
          secureTextEntry
        />
        {errorMessage !== '' && (
          <Body_1_Text style={Styles.errorText}>{errorMessage}</Body_1_Text>
        )}
        <VerticalSpacingButtonContainer>
          <ButtonMagenta onPress={handleSignIn}>
            <WhiteText>
              <H4_Card_Nav_Tab>Login</H4_Card_Nav_Tab>
            </WhiteText>
          </ButtonMagenta>
        </VerticalSpacingButtonContainer>

        <SmallTextContainer>
          <Body_1_Text>
            Don't have an account?{' '}
            <Body_1_Text style={Styles.underline}>Sign up.</Body_1_Text>
          </Body_1_Text>
        </SmallTextContainer>
      </FormContainer>
    </LoginContainer>
  );
}
