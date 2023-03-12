import React, { ReactNode } from 'react';
import { FlexAlignType, View } from 'react-native';

interface HeaderContainerProps {
  alignment?: FlexAlignType;
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
        height: '12%',
        display: 'flex',
        alignItems: alignment || 'center',
      }}
    >
      {children}
    </View>
  );
}
