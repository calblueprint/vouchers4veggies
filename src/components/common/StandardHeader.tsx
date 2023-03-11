import React, { ReactNode } from 'react';
import { FlexAlignType, View } from 'react-native';

interface HeaderContainerProps {
  alignment?: FlexAlignType;
  // justifycontent?: FlexContentType;
  children: ReactNode;
}

export default function HeaderContainer({
  alignment,
  // justifycontent,
  children,
}: HeaderContainerProps) {
  return (
    <View
      style={{
        width: '100%',
        height: '12%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: alignment || 'center',
      }}
    >
      {children}
    </View>
  );
}
