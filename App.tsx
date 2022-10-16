import { StyleSheet, Text, View } from 'react-native';
import Homepage from './screens/Homepage'
import Invoice from './screens/Invoice'
import Profile from './screens/Profile'

import VendorsListDemo from './VendorsListDemo';
//add this import statement
import { getAllTestDocs } from './src/database/queries';
import { H1Heading } from './assets/Fonts';

export default function App() {
  //call the function here
  getAllTestDocs();
  return (
    <View style={styles.container}>
      <Homepage></Homepage>
      <Invoice></Invoice>
      <Profile></Profile>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
