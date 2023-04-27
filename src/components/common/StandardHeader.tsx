import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface HeaderContainerProps {
  children: ReactNode;
  width?: string;
}

export default function HeaderContainer({
  children,
  width,
}: HeaderContainerProps) {
  return (
    <View
      style={{
        width: width || '90%',
        height: '12%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  );
}
