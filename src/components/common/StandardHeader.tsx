import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

const HeaderContainer = styled.View`
  width: 100%;
  height: 80px;
  padding-horizontal: 29px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  alignitems: center;
`;

type StandardHeaderProps = {
  children: ReactNode;
};

export default function StandardHeader({ children }: StandardHeaderProps) {
  return <HeaderContainer>{children}</HeaderContainer>;
}
