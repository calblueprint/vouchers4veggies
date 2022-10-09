import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import TestBarcodeScanner from './src/screens/TestBarcodeScanner';
import { getAllTestDocs } from './src/database/queries';

export default function App() {
  getAllTestDocs();
  return (
    <>
      <TestBarcodeScanner></TestBarcodeScanner>
      <View style={styles.container}>
        <Text>Vouchers 4 Veggies</Text>
      </View>
    </>
=======
import VendorsListDemo from './VendorsListDemo';
//add this import statement
import { getAllTestDocs } from './src/database/queries';

export default function App() {
  //call the function here
  getAllTestDocs();
  return (
    <View style={styles.container}>
      <Text>Vouchers 4 Veggies</Text>
      <VendorsListDemo />
    </View>
>>>>>>> 4eb1614204b414d067442d87b76fab2233efa791
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
