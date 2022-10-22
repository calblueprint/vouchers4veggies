import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';
import Scanner from '../components/Scanner';

export const Homepage = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [heading, setHeading] = useState('Hello! Scan your voucher(s).');
  const [counter, setCounter] = useState(0);
  const [showScanButton, setShowScanButton] = useState(true);
  const [finishedScanning, setFinishedScanning] = useState(false);

  const nText = (n: number, text: string) => {
    if (n == 1) {
      return `${n} ${text}`;
    } else {
      return `${n} ${text}s`;
    }
  };

  const scanVoucher = (event: any) => {
    // TODO: add handling for if scanning fails
    if (!showScanner) {
      setShowScanner(true);
      setHeading('Scan your voucher(s).');
    } else {
      setCounter(counter + 1);
    }
  };

  const reviewVouchers = () => {
    setShowScanner(false);
    setShowScanButton(false);
    setHeading('Review vouchers');
    // TODO: update scanner with checkmark
  };

  const submitVouchers = () => {
    setFinishedScanning(true);
    setHeading(`You submitted ${nText(counter, 'voucher')}!`);
  };

  const goToHomepage = () => {};

  const submitMore = () => {
    setFinishedScanning(false);
    setShowScanner(true);
    setShowScanButton(true);
    setCounter(0);
    setHeading('Scan your voucher(s).');
  };

  return (
    <View style={styles.container}>
      {counter > 0 ? (
        <Button
          onPress={reviewVouchers}
          title={`Review ${nText(counter, 'voucher')}`}
        />
      ) : null}

      <Text>{heading}</Text>

      {showScanner ? (
        <View>
          <Scanner />
        </View>
      ) : null}

      {/* {stage === 'Finished Scanning' ? <button>Go to homepage</button> : null} */}

      {!finishedScanning ? (
        showScanButton ? (
          <Button onPress={scanVoucher} title="Scan" />
        ) : (
          <Button
            onPress={submitVouchers}
            title={`Submit ${nText(counter, 'voucher')}`}
          />
        )
      ) : (
        <View>
          <Button onPress={goToHomepage} title="Go to homepage" />
          <Button onPress={submitMore} title="Submit more" />
        </View>
      )}
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
