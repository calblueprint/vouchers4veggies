import { View } from 'react-native';
import React, { useState } from 'react';
import { H2Heading, H4CardNavTab, Body1Text } from '../../../assets/Fonts';
import { ButtonMagenta } from '../../../assets/Components';
import InputField from '../../components/InputField/InputField';
import { AuthStackScreenProps } from '../../navigation/types';

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

export default function SignupScreen({
  navigation,
}: AuthStackScreenProps<'Start'>) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // TO-DO: @allisonhongberkeley transfer data to createPassword screen
  const handleSubmit = () => {
    navigation.navigate('CreatePassword');
  };

  return (
    <LoginContainer>
      {/* logo placeholder */}
      <LogoContainer>
        <View style={Styles.logoPlaceholder}></View>
      </LogoContainer>

      <FormContainer>
        <HeadingContainer>
          <H2Heading>Hi there! Please create an account.</H2Heading>
        </HeadingContainer>

        <Body1Text style={Styles.bold}>Name</Body1Text>
        <InputField onChange={setName} value={name} placeholder="Enter name" />

        <RowContainer>
          <LeftAlignContainer>
            <Body1Text style={Styles.bold}>Email</Body1Text>
          </LeftAlignContainer>
        </RowContainer>

        <InputField
          onChange={setEmail}
          value={email}
          placeholder="Enter email"
        />

        <VerticalSpacingButtonContainer>
          <ButtonMagenta onPress={handleSubmit}>
            <WhiteText>
              <H4CardNavTab>Next</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </VerticalSpacingButtonContainer>

        <SmallTextContainer>
          <Body1Text>
            {`Already have an account `}
            <Body1Text
              style={Styles.underline}
              onClick={() => navigation.navigate('Login')}
            >
              Login
            </Body1Text>
          </Body1Text>
        </SmallTextContainer>
      </FormContainer>
    </LoginContainer>
  );
}
