import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonMagenta, SafeArea } from '../../../assets/Components';
import { H1Heading, H4CardNavTab, WhiteText } from '../../../assets/Fonts';
import { AuthStackScreenProps } from '../../navigation/types';
import StandardLogo from '../../components/common/StandardLogo';
import { ButtonContainer, StartContainer } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function StartScreen({
  navigation,
}: AuthStackScreenProps<'Start'>) {
  return (
    <View style={styles.container}>
      <SafeArea>
        <StartContainer>
          <StandardLogo />
          <H1Heading>{"Hello! Let's get\nyou started."}</H1Heading>

          <ButtonContainer>
            <ButtonMagenta onPress={() => navigation.navigate('Login')}>
              <WhiteText>
                <H4CardNavTab>Login</H4CardNavTab>
              </WhiteText>
            </ButtonMagenta>
          </ButtonContainer>
        </StartContainer>
      </SafeArea>
    </View>
  );
}
