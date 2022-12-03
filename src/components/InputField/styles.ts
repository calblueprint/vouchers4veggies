import { StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';

const Styles = StyleSheet.create({
  FormField: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.midGray,
    backgroundColor: Colors.lightGray,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: '3%',
    marginBottom: '4%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  FormFieldFocus: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.magenta,
    backgroundColor: Colors.offWhite,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginTop: '3%',
    marginBottom: '4%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextInputField: {
    width: '100%',
  },
  Icon: {
    position: 'relative',
  },
});

export default Styles;
