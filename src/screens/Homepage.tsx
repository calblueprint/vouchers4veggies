import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';

export const Homepage = () => {
  const [stage, setStage] = useState('Welcome');
  const [header, setHeader] = useState('Hello! Scan your vouchers');
  const [scanButtonText, setScanButtonText] = useState('Scan');
  const [counter, setCounter] = useState(0);

  const scanVoucher = (event: any) => {
    console.log(event);
    if (stage === 'Welcome') {
      setStage('First Scan');
    } else if (stage === 'Finished Scanning') {
      setStage('Multiple Scans');
      setScanButtonText('Scan');
    } else {
      if (stage === 'First Scan') {
        setStage('Multiple Scans');
        setHeader('Scan your voucher(s)');
      } else {
        setHeader('Scan another');
      }
      // TODO: add handling for if scanning fails
      setCounter(counter + 1);
    }
  };

  const finishScanning = () => {
    setStage('Finished Scanning');
    setHeader(`Thank you! You have submitted ${counter} vouchers!`);
    setScanButtonText('Scan more');
    // TODO: update scanner with checkmark
  };

  return (
    <View style={styles.container}>
      {counter > 0 ? <Text>placeholder x{counter}</Text> : null}

      <Text>{header}</Text>
      {stage === 'Finished Scanning' ? <button>Go to homepage</button> : null}

      <Button onPress={scanVoucher} title={scanButtonText} />

      {stage === 'Multiple Scans' ? (
        <Button onPress={finishScanning} title="I'm done scanning" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
