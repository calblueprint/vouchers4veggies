import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Body1Text, H2Heading, H4CardNavTab } from '../../../assets/Fonts';
import { ButtonMagenta } from '../../../assets/Components';
import InputField from '../../components/InputField/InputField';

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

  const onChangeEmail = (value: string) => {
    setEmail(value);
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

        <VerticalSpacingButtonContainer>
          <ButtonMagenta>
            <WhiteText>
              <H4CardNavTab>Send email</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </VerticalSpacingButtonContainer>
      </FormContainer>
    </LoginContainer>
  );
}
