import React from 'react';
import styled from 'styled-components/native';
import v4vLogo from '../../../assets/images/top-bar-logo.png';

const LogoContainer = styled.ImageBackground`
  width: 90px;
  height: 100px;
  margin-bottom: 24px;
`;

export default function StandardLogo() {
  return <LogoContainer source={v4vLogo} />;
}
