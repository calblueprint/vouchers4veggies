import { StyleSheet, Text, View } from 'react-native';

import VendorsListDemo from './VendorsListDemo';
//add this import statement
import { getAllTestDocs } from './src/database/queries';
import { H1Heading } from './assets/Fonts';

export default function App() {
  //call the function here
  getAllTestDocs();
  return (
    <View style={styles.container}>
      <H1Heading>Vouchers 4 Veggies</H1Heading>
      <VendorsListDemo />
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
