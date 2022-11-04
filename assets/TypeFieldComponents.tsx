import styled from 'styled-components/native';
import React from 'react';
import { SafeAreaView, TextInput } from 'react-native';

const textInputs = () => {
  const [text, onChangeText] = React.useState('Default Text');
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={[
          defaultBox.input,
          typing.input,
          entered.input,
          errorEmpty.input,
          errorEntered.input,
        ]}
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};

/**
 * Styling for default text box
 */
export const defaultBox = styled.Text`
  box-sizing: border-box;

  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: lightGray;

  border: 1px solid midGray;
  border-radius: 5px;
`;

/**
 * Styling for typing text box
 */
export const typing = styled.Text`
  box-sizing: border-box;

  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: offWhite;

  border: 1px solid magenta;
  border-radius: 5px;
`;

/**
 * Styling for text entered text box
 */
export const entered = styled.Text`
  box-sizing: border-box;

  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: offWhite;

  border: 1px solid midGray;
  border-radius: 5px;
`;

/**
 * Styling for error if empty text box
 */
export const errorEmpty = styled.Text`
  box-sizing: border-box;

  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: alertLightRed;

  border: 1px solid midGray;
  border-radius: 5px;
`;

/**
 * Styling for error with entered input text box
 */
export const errorEntered = styled.Text`
  box-sizing: border-box;

  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: alertLightRed;
  /* Mid Gray */

  border: 1px solid midGray;
  border-radius: 5px;
`;

export default textInputs;
