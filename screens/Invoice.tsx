import { StyleSheet, Text, View } from 'react-native';

export default function Invoice () {
  return (
    <View style={styles.container}>
      <Text>Invoice History</Text>
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