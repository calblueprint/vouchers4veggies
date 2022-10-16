import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable,
} from 'react-native';
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
      {counter > 0 ? (
        <TouchableOpacity onPress={reviewVouchers} style={styles.dark_button}>
          <Text style={styles.body_text}>
            Review {nText(counter, 'voucher')}
          </Text>
        </TouchableOpacity>
      ) : null}

      <Text style={styles.h2_heading}>{heading}</Text>

      {showScanner ? (
        <View>
          <Scanner />
        </View>
      ) : null}

      {!finishedScanning ? (
        showScanButton ? (
          <TouchableOpacity onPress={scanVoucher} style={styles.dark_button}>
            <Text style={styles.h4_heading}>Scan</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={submitVouchers} style={styles.dark_button}>
            <Text style={styles.h4_heading}>
              Submit {nText(counter, 'voucher')}
            </Text>
          </TouchableOpacity>
        )
      ) : (
        <View>
          <TouchableOpacity onPress={goToHomepage} style={styles.light_button}>
            <Text style={styles.h4_heading}>Go to homepage</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={submitMore} style={styles.dark_button}>
            <Text style={styles.h4_heading}>Submit more</Text>
          </TouchableOpacity>
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
  h2_heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '5%',
  },
  h4_heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body_text: {
    fontSize: 14,
    textAlign: 'center',
  },
  dark_button: {
    backgroundColor: '#d9d9d9',
    width: '80%',
    padding: '10px',
    marginTop: '5%',
    marginBottom: '5%',
  },
  light_button: {
    backgroundColor: '#f2f2f2',
    width: '80%',
    padding: '10px',
    marginTop: '5%',
    marginBottom: '5%',
  },
});
