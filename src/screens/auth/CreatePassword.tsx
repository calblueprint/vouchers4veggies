import { Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import {
  H2Heading,
  H4_Card_Nav_Tab,
  Body_1_Text,
  Body_2_Subtext,
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
import { AuthContext } from './AuthContext';

export const CreatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, confirmPassword] = useState('');

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    togglePasswordVisibility();

  const submitPassword = () => {
    //write data to firebase
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
            <Body_1_Text style={Styles.bold}>Password</Body_1_Text>
          </LeftAlignContainer>
        </RowContainer>

        <PasswordInput
          onChange={setPassword}
          value={password}
          placeholder="Enter password"
          secureTextEntry={passwordVisibility}
        />

        <RowContainer>
          <LeftAlignContainer>
            <Body_1_Text style={Styles.bold}>Confirm Password</Body_1_Text>
          </LeftAlignContainer>
        </RowContainer>

        <PasswordInput
          onChange={confirmPassword}
          value={confirm}
          placeholder="Enter same password"
          secureTextEntry={true}
        />

        <Body_2_Subtext>
          <Text
            style={{ lineHeight: 20 }}
          >{`Password must include: \n❌ 8-20 characters \n❌ At least 1 capital letter`}</Text>
        </Body_2_Subtext>

        <VerticalSpacingButtonContainer>
          <ButtonMagenta onPress={submitPassword}>
            <WhiteText>
              <H4_Card_Nav_Tab>Next</H4_Card_Nav_Tab>
            </WhiteText>
          </ButtonMagenta>
        </VerticalSpacingButtonContainer>
      </FormContainer>
    </LoginContainer>
  );
};
