import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const Styles = StyleSheet.create({
  FormField: {
    borderWidth: 1,
    borderColor: Colors.midGray,
    backgroundColor: Colors.lightGray,
    height: 35,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: '3%',
    marginBottom: '4%',
    borderRadius: 5,
    width: '100%',
  },
  FormFieldFocus: {
    borderWidth: 1,
    borderColor: Colors.magenta,
    backgroundColor: Colors.offWhite,
    height: 35,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: '3%',
    marginBottom: '4%',
    borderRadius: 5,
    width: '100%',
  },
});

export default Styles;
