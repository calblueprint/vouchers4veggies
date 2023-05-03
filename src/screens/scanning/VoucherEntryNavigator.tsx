import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeArea } from '../../../assets/Components';
import { NavButtonText, TitleText } from '../../../assets/Fonts';
import StandardHeader from '../../components/common/StandardHeader';
import { VoucherEntryNavigationProps } from '../../navigation/types';
import Colors from '../../../assets/Colors';
import { useScanningContext } from './ScanningContext';
import { handlePreventLeave } from '../../utils/scanningUtils';
import { NavButton, NavButtonContainer } from './styles';
import ManualVoucherScreen from './ManualVoucherScreen';
import ScanningScreen from './ScanningScreen';
import VoucherBatchScreen from './VoucherBatchScreen';

interface VoucherEntryNavigatorProps {
  navigation: VoucherEntryNavigationProps;
}

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

  return (
    // this line enables the keyboard to be dismissed when the user taps anywhere on the screen
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeArea>
        <StandardHeader>
          <TitleText>Add a voucher</TitleText>
          <TouchableOpacity
            onPress={() =>
              handlePreventLeave({
                hasUnsavedChanges,
                navigation,
                dispatch,
              })
            }
          >
            <Icon name="close" size={24} color={Colors.midBlack} />
          </TouchableOpacity>
        </StandardHeader>
        <View>
          <NavButtonContainer>
            <NavButton
              isSelected={selection === tabs.SERIAL}
              onPress={() => {
                setSelection(tabs.SERIAL);
              }}
            >
              <NavButtonText
                style={
                  selection === tabs.SERIAL
                    ? { color: Colors.magenta }
                    : { color: Colors.midGray }
                }
              >
                Serial
              </NavButtonText>
            </NavButton>
            <NavButton
              isSelected={selection === tabs.RANGE}
              onPress={() => {
                setSelection(tabs.RANGE);
              }}
            >
              <NavButtonText
                style={
                  selection === tabs.RANGE
                    ? { color: Colors.magenta }
                    : { color: Colors.midGray }
                }
              >
                Range
              </NavButtonText>
            </NavButton>
            <NavButton
              isSelected={selection === tabs.BARCODE}
              onPress={() => {
                setSelection(tabs.BARCODE);
              }}
            >
              <NavButtonText
                style={
                  selection === tabs.BARCODE
                    ? { color: Colors.magenta }
                    : { color: Colors.midGray }
                }
              >
                Barcode
              </NavButtonText>
            </NavButton>
          </NavButtonContainer>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* TODO @sauhardjain: Fix typing of navigation attributes */}
          {(() => {
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
          })()}
        </KeyboardAvoidingView>
        <Toast />
      </SafeArea>
    </TouchableWithoutFeedback>
  );
}
