import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface HeaderContainerProps {
  children: ReactNode;
}

export default function HeaderContainer({ children }: HeaderContainerProps) {
  return (
    <View
      style={{
        width: '90%',
        height: '12%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </View>
  );
}
