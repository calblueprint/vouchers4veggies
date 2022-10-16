import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function Homepage () {
  const [showScanner, setShowScanner] = useState(false);

  const scanVoucher = () => {
    setShowScanner(true);
  }

  return (
    <View style={styles.container}>
      <Text>Hello! Scan your vouchers</Text>
      <button onClick={scanVoucher}>Scan</button>
      {showScanner ?
        <div>
          placeholder
        </div> : null
      }
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