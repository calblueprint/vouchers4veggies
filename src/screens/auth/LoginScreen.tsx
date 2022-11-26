import { Text, View } from 'react-native';
import React, { useState, useContext } from 'react';
import { H2Heading, H4_Card_Nav_Tab, Body_1_Text } from '../../../assets/Fonts';
import { ButtonMagenta } from '../../../assets/Components';
import { InputField } from '../../components/InputField/InputField';
import {
  HeadingContainer,
  LoginContainer,
  LogoContainer,
  FormContainer,
  Styles,
  VerticalSpacingButtonContainer,
  SmallTextContainer,
  RowContainer,
  RightAlignContainer,
  LeftAlignContainer,
  WhiteText,
} from './styles';
import { AuthContext } from './AuthContext';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);
  const handleSignIn = async () => signIn(email, password);

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
          onChange={setEmail}
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
          onChange={setPassword}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
        />

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
};
