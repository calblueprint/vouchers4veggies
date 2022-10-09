import { StyleSheet, Text, View } from 'react-native';
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
  );
}
module.exports = {
  module: {
    rules: [
      {
        test: /\.(woff2|woff|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
