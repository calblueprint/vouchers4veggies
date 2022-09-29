import { StyleSheet, Text, View } from 'react-native';

export default function Homepage () {
  return (
    <View style={styles.container}>
      <Text>Hello! Scan your vouchers</Text>
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