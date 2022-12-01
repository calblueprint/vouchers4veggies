import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonMagenta, ButtonWhite } from '../../../assets/Components';
import {
  H3_Subheading,
  Body_1_Text,
  H1Heading,
  H2Heading,
  H4_Card_Nav_Tab,
  ButtonTextWhite,
} from '../../../assets/Fonts';
import { InputField } from '../../components/InputField/InputField';
import { signIn } from '../../utils/authUtils';
import { useAuthContext } from './AuthContext';
import {
  ButtonContainer,
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

export const ProfileScreen = ({ route, navigation }: any) => {
  const [name, setName] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <H1Heading style={styles.center_text} name={name} setName={setName}>
        name
      </H1Heading>
      <View style={styles.container}>
        <H4_Card_Nav_Tab>Email</H4_Card_Nav_Tab>
        <H3_Subheading email={email} setEmail={setEmail}>
          email
        </H3_Subheading>
      </View>
      <View style={styles.container}>
        <H4_Card_Nav_Tab>Phone Number</H4_Card_Nav_Tab>
        <H3_Subheading
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        >
          phoneNumber
        </H3_Subheading>
      </View>
      <View style={styles.container}>
        <H4_Card_Nav_Tab>Password</H4_Card_Nav_Tab>
        <H3_Subheading password={password} setPassword={setPassword}>
          password
        </H3_Subheading>
      </View>
      <ButtonMagenta>
        <ButtonTextWhite>Log Out</ButtonTextWhite>
      </ButtonMagenta>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center_text: {
    textAlign: 'center',
  },
});
