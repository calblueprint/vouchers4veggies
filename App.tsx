import { StyleSheet, Text, View } from 'react-native';
import Homepage from './screens/Homepage'
import Invoice from './screens/Invoice'
import Profile from './screens/Profile'


export default function App() {
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
