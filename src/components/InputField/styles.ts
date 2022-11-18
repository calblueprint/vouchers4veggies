import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Colors } from '../../../assets/Colors';

export const Styles = StyleSheet.create({
  FormField: {
    borderWidth: 1,
    borderColor: Colors.midGray,
    backgroundColor: Colors.lightGray,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  FormFieldFocus: {
    borderWidth: 1,
    borderColor: Colors.magenta,
    backgroundColor: Colors.offWhite,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
});
