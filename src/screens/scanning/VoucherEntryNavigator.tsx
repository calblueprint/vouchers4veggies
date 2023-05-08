import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Row, SafeArea } from '../../../assets/Components';
import { H2Heading } from '../../../assets/Fonts';
import StandardHeader from '../../components/common/StandardHeader';
import { VoucherEntryNavigationProps } from '../../navigation/types';
import Colors from '../../../assets/Colors';
import { useScanningContext } from './ScanningContext';
import { handlePreventLeave } from '../../utils/scanningUtils';
import ManualVoucherScreen from './ManualVoucherScreen';
import ScanningScreen from './ScanningScreen';
import VoucherBatchScreen from './VoucherBatchScreen';
import NavButton from '../../components/scanning/NavButton';

type VoucherEntryNavigatorProps = {
  navigation: VoucherEntryNavigationProps;
};

enum tabs {
  SERIAL,
  RANGE,
  BARCODE,
}

export default function VoucherEntryNavigator({
  navigation,
}: VoucherEntryNavigatorProps) {
  const [selection, setSelection] = useState(tabs.SERIAL);
  const { voucherMap, dispatch } = useScanningContext();
  const hasUnsavedChanges = Boolean(voucherMap.size);

  const onPreventLeave = () =>
    handlePreventLeave({
      hasUnsavedChanges,
      navigation,
      dispatch,
    });

  const onSelectSerial = () => setSelection(tabs.SERIAL);

  const onSelectRange = () => setSelection(tabs.RANGE);

  const onSelectBarcode = () => setSelection(tabs.BARCODE);

  const handleNavigate = () => {
    switch (selection) {
      case tabs.SERIAL:
        return <ManualVoucherScreen navigation={navigation} />;
      case tabs.RANGE:
        return <VoucherBatchScreen navigation={navigation} />;
      case tabs.BARCODE:
        return <ScanningScreen navigation={navigation} />;
      default:
        return <ManualVoucherScreen navigation={navigation} />;
    }
  };

  return (
    // this line enables the keyboard to be dismissed when the user taps anywhere on the screen
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeArea>
        <StandardHeader>
          <H2Heading>Add a voucher</H2Heading>
          <TouchableOpacity onPress={onPreventLeave}>
            <Icon name="close" size={24} color={Colors.midBlack} />
          </TouchableOpacity>
        </StandardHeader>

        <Row>
          <NavButton
            isSelected={selection === tabs.SERIAL}
            onPress={onSelectSerial}
            title="Serial"
          />
          <NavButton
            isSelected={selection === tabs.RANGE}
            onPress={onSelectRange}
            title="Range"
          />
          <NavButton
            isSelected={selection === tabs.BARCODE}
            onPress={onSelectBarcode}
            title="Barcode"
          />
        </Row>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {handleNavigate()}
        </KeyboardAvoidingView>
        <Toast />
      </SafeArea>
    </TouchableWithoutFeedback>
  );
}
