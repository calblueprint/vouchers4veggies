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
import { ScannerStackScreenProps } from '../../navigation/types';
import Colors from '../../../assets/Colors';
import { useScanningContext } from './ScanningContext';
import { handlePreventLeave } from '../../utils/scanningUtils';
import styles, { NavButton, NavButtonContainer } from './styles';
import ManualVoucherScreen from './ManualVoucherScreen';
import ScanningScreen from './ScanningScreen';
import VoucherBatchScreen from './VoucherBatchScreen';

export default function VoucherEntryNavigator({
  navigation,
}: ScannerStackScreenProps<'VoucherEntryNavigator'>) {
  const [selection, setSelection] = useState(1);
  const { voucherMap, dispatch } = useScanningContext();
  const hasUnsavedChanges = Boolean(voucherMap.size);

  return (
    // this line enables the keyboard to be dismissed when the user taps anywhere on the screen
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeArea>
        <StandardHeader width="80%">
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
              style={
                selection === 1 ? styles.selectedBtn : styles.unselectedBtn
              }
              onPress={() => {
                setSelection(1);
              }}
            >
              <NavButtonText
                style={
                  selection === 1
                    ? { color: Colors.magenta }
                    : { color: Colors.midGray }
                }
              >
                Serial
              </NavButtonText>
            </NavButton>
            <NavButton
              style={
                selection === 2 ? styles.selectedBtn : styles.unselectedBtn
              }
              onPress={() => {
                setSelection(2);
              }}
            >
              <NavButtonText
                style={
                  selection === 2
                    ? { color: Colors.magenta }
                    : { color: Colors.midGray }
                }
              >
                Range
              </NavButtonText>
            </NavButton>
            <NavButton
              style={
                selection === 3 ? styles.selectedBtn : styles.unselectedBtn
              }
              onPress={() => {
                setSelection(3);
              }}
            >
              <NavButtonText
                style={
                  selection === 3
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
              case 1:
                return <ManualVoucherScreen navigation={navigation} />;
              case 2:
                return <VoucherBatchScreen navigation={navigation} />;
              case 3:
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
