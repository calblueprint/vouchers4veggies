import { StyleSheet, Text, View } from 'react-native';
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
