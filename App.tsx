import { StyleSheet, Text, View } from 'react-native';
//add this import statement
import { getAllTestDocs } from './src/database/queries';


export default function App() {
	//call the function here
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
