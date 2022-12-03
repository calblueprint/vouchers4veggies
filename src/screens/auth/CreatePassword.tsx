import { Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  H2Heading,
  H4CardNavTab,
  Body1Text,
  Body2Subtext,
} from '../../../assets/Fonts';
import { ButtonMagenta } from '../../../assets/Components';
import {
  PasswordInput,
  togglePasswordVisibility,
} from '../../components/InputField/PasswordInput';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthContext } from './AuthContext';

export const CreatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, confirmPassword] = useState('');

  const submitPassword = () => {
    //write data to firebase

    //TO-DO: @allisonhongberkeley error-checking, make sure password == confirm
    console.log(password);
    console.log(confirm);
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
          <H2Heading>Create a password.</H2Heading>
        </HeadingContainer>

        <RowContainer>
          <LeftAlignContainer>
            <Body1Text style={Styles.bold}>Password</Body1Text>
          </LeftAlignContainer>
        </RowContainer>

        <PasswordInput
          onChange={setPassword}
          value={password}
          placeholder="Enter password"
        />

        <RowContainer>
          <LeftAlignContainer>
            <Body1Text style={Styles.bold}>Confirm Password</Body1Text>
          </LeftAlignContainer>
        </RowContainer>

        <PasswordInput
          onChange={confirmPassword}
          value={confirm}
          placeholder="Enter same password"
          secureTextEntry={true}
        />

        <Body2Subtext>
          <Text
            style={{ lineHeight: 20 }}
          >{`Password must include: \n❌ 8-20 characters \n❌ At least 1 capital letter`}</Text>
        </Body2Subtext>

        <VerticalSpacingButtonContainer>
          <ButtonMagenta onPress={submitPassword}>
            <WhiteText>
              <H4CardNavTab>Next</H4CardNavTab>
            </WhiteText>
          </ButtonMagenta>
        </VerticalSpacingButtonContainer>
      </FormContainer>
    </LoginContainer>
  );
};
