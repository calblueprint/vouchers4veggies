import React, { ReactNode } from 'react';
import { FlexAlignType, View } from 'react-native';

interface HeaderContainerProps {
  alignment?: FlexAlignType;
  topMargin?: string;
  children: ReactNode;
}

export default function HeaderContainer({
  alignment,
  topMargin,
  children,
}: HeaderContainerProps) {
  return (
    <View
      style={{
        width: '90%',
        height: '12%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '0%',
        justifyContent: 'space-between',
        alignItems: alignment || 'center',
      }}
    >
      {children}
    </View>
  );
}
