import React, { ReactNode } from 'react';
import { FlexAlignType, View } from 'react-native';

interface HeaderContainerProps {
  alignment: FlexAlignType;
  children: ReactNode;
}

export default function HeaderContainer({
  alignment,
  children,
}: HeaderContainerProps) {
  return (
    <View
      style={{
        width: '100%',
        height: '15%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: alignment,
      }}
    >
      {children}
    </View>
  );
}
