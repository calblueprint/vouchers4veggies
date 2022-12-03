import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const Styles = StyleSheet.create({
  FormField: {
    height: 35,
    borderWidth: 1,
    borderColor: Colors.midGray,
    backgroundColor: Colors.lightGray,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: '3%',
    marginBottom: '4%',
    borderRadius: 5,
  },
  FormFieldFocus: {
    borderWidth: 1,
    borderColor: Colors.magenta,
    backgroundColor: Colors.offWhite,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: '3%',
    marginBottom: '4%',
    borderRadius: 5,
  },
});

export default Styles;
