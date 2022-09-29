import { StyleSheet, Text, View } from 'react-native';
import InvoiceBox from '.././components/invoice_box'


export default function Invoice () {
  return (
    <View style={styles.container}>
      <Text>Invoice History</Text>
      <InvoiceBox></InvoiceBox>
      <InvoiceBox></InvoiceBox>
      <InvoiceBox></InvoiceBox>
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