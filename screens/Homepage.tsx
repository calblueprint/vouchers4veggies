import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable,
  Button,
} from 'react-native';
import { useState } from 'react';
import Scanner from '../components/Scanner';
import { H2Heading } from '../assets/Fonts';

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
    // add handling for if scanning fails
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
      {!finishedScanning && counter > 0 ? (
        <Button
          onPress={reviewVouchers}
          title={`Review ${nText(counter, 'voucher')}`}
        />
      ) : null}
      <H2Heading>{heading}</H2Heading>
      {showScanner ? (
        <View>
          <Scanner />
        </View>
      ) : null}
      {!finishedScanning ? (
        showScanButton ? (
          <Button onPress={scanVoucher} title="Scan" />
        ) : (
          <View style={styles.wide_view}>
            {/* display voucher data */}
            <Text>Voucher data here</Text>
            <Button
              onPress={submitVouchers}
              title={`Submit ${nText(counter, 'voucher')}`}
            />
          </View>
        )
      ) : (
        <View style={styles.wide_view}>
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
  wide_view: {
    width: '100%',
    alignItems: 'center',
  },
});
