import { Text, View } from 'react-native';
import React, { useState } from 'react';
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
  LeftAlignContainer,
  WhiteText,
} from './styles';
import { signUp } from '../../utils/authUtils';
import { useAuthContext } from './AuthContext';

export const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // const { authState, dispatch } = useAuthContext();

  const submitForm = () => {
    //transfer data to createPassword screen
    console.log(name);
    console.log(email);
    //route to next page -> createPassword
  };

  return (
    <LoginContainer>
      {/* logo placeholder */}
      <LogoContainer>
        <View
          style={{ backgroundColor: 'black', width: 50, height: 59.29 }}
        ></View>
      </LogoContainer>

      <FormContainer>
        <HeadingContainer>
          <H2Heading>Hi there! Please create an account.</H2Heading>
        </HeadingContainer>

        <Body_1_Text style={Styles.bold}>Name</Body_1_Text>
        <InputField onChange={setName} value={name} placeholder="Enter name" />

        <RowContainer>
          <LeftAlignContainer>
            <Body_1_Text style={Styles.bold}>Email</Body_1_Text>
          </LeftAlignContainer>
        </RowContainer>

        <InputField
          onChange={setEmail}
          value={email}
          placeholder="Enter email"
        />

        <VerticalSpacingButtonContainer>
          <ButtonMagenta onPress={submitForm}>
            <WhiteText>
              <H4_Card_Nav_Tab>Next</H4_Card_Nav_Tab>
            </WhiteText>
          </ButtonMagenta>
        </VerticalSpacingButtonContainer>

        <SmallTextContainer>
          <Body_1_Text>
            Already have an account?{' '}
            <Body_1_Text style={Styles.underline}>Login</Body_1_Text>
          </Body_1_Text>
        </SmallTextContainer>
      </FormContainer>
    </LoginContainer>
  );
};
