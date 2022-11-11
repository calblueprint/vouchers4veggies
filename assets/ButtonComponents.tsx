import styled from 'styled-components/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Styling for white button
 */
export const buttonWhite = styled.TouchableOpacity`

box-sizing: border-box;
width: 59px;
height: 25px;
font-family: 'Manrope';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 25px;
text-align: center;
color: midBlack;
flex: none;
order: 0;
flex-grow: 0;
border: 2px solid magenta;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
border-radius: 5px;
})`;

/**
 * Styling for magenta button
 */
export const buttonMagenta = styled.TouchableOpacity`
  box-sizing: border-box;
  width: 59px;
  height: 25px;
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: offWhite;
  flex: none;
  order: 0;
  flex-grow: 0;
  background: magenta;
  border: 2px solid magenta;
  border-radius: 5px;
`;

/**
 * Styling for gray button
 */
export const buttonGray = styled.TouchableOpacity`
  box-sizing: border-box;
  width: 59px;
  height: 25px;
  /* H4 Card, Nav, Tab */
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */
  text-align: center;
  /* Mid Black */
  color: midBlack;
  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  /* Mid Gray */
  background: midGray;
  border: 2px solid midGray;
  border-radius: 5px;
`;
