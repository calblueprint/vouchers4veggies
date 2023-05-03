import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

export const styles = StyleSheet.create({
  fieldDefault: {
    borderWidth: 1,
    height: 35,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: '3%',
    marginBottom: '4%',
    borderRadius: 5,
    borderColor: Colors.midGray,
    backgroundColor: Colors.lightGray,
  },
  isFocused: {
    borderColor: Colors.magenta,
    backgroundColor: Colors.offWhite,
  },
  isInvalid: {
    borderColor: Colors.alertRed,
    backgroundColor: Colors.alertLightRed,
  },
});

export const fieldFocused = StyleSheet.compose(
  styles.fieldDefault,
  styles.isFocused,
);

export const fieldIsInvalid = StyleSheet.compose(
  styles.fieldDefault,
  styles.isInvalid,
);
