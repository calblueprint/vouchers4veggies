import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Scanner from '../components/scanner';

export default function Homepage () {
  const [stage, setStage] = useState("Welcome");
  const [header, setHeader] = useState("Hello! Scan your vouchers");
  const [scanButtonText, setScanButtonText] = useState("Scan");
  const [counter, setCounter] = useState(0);
  
  const scanVoucher = (event) => {
    if (stage === "Welcome") {
      setStage("First Scan");
    } else if (stage === "Finished Scanning") {
      setStage("Multiple Scans")
      setScanButtonText("Scan");
    } else {
      if (stage === "First Scan") {
        setStage("Multiple Scans");
        setHeader("Scan your voucher(s)");
      } else {
        setHeader("Scan another");
      }
      // TODO: add handling for if scanning fails
      setCounter(Number(event.target.value) + 1);
    }
  }

  const finishScanning = () => {
    setStage("Finished Scanning");
    setHeader(`Thank you! You have submitted ${counter} vouchers!`);
    setScanButtonText("Scan more");
    // TODO: update scanner with checkmark
  }

  return (
    <View style={styles.container}>
      {counter > 0 ?
        <Text>placeholder x{counter}</Text> : null
      }

      <Text>{header}</Text>

      {stage === "First Scan" || stage === "Multiple Scans" ?
        <div>
          <Scanner />
        </div> : null
      }


      {stage === "Finished Scanning" ?
        <button>
          Go to homepage
        </button> : null
      }

      <button onClick={scanVoucher} value={counter}>
        {scanButtonText}
      </button>

      {stage === "Multiple Scans" ?
        <button onClick={finishScanning}>
          I'm done scanning
        </button> : null
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