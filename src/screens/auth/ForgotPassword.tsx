import React from 'react';
import { Text, View } from 'react-native';

import { LogoContainer } from './styles';

export default function ForgotPasswordScreen() {
  return (
    <LogoContainer>
      <View style={{ backgroundColor: 'black', width: 50, height: 59.29 }}>
        <Text style={{ color: 'white' }}>{`\n  Logo`}</Text>
      </View>
    </LogoContainer>
  );
}
