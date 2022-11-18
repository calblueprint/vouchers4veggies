import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../assets/Colors';

export const Styles = StyleSheet.create({
  FormField: {
    borderWidth: 1,
    borderColor: Colors.midGray,
    backgroundColor: Colors.lightGray,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  FormFieldFocus: {
    borderWidth: 1,
    borderColor: Colors.magenta,
    backgroundColor: Colors.offWhite,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
