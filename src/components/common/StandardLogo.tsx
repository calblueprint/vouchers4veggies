import React from 'react';
import styled from 'styled-components/native';
import v4vLogo from '../../../assets/top-bar-logo.png';

const LogoContainer = styled.ImageBackground`
  width: 60px;
  height: 70px;
`;

export default function StandardLogo() {
  return <LogoContainer source={v4vLogo} />;
}
