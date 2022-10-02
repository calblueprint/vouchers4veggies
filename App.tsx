import { StyleSheet, Text, View } from 'react-native';
import { getAllTestDocs } from './database/queries';

export default function App() {
  getAllTestDocs();
  return (
    <View style={styles.container}>
      <Text>Vouchers 4 Veggies</Text>
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
