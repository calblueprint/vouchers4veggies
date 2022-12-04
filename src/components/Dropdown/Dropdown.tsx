// import { Styles } from './styles';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../../assets/Colors';

type DropdownProps = {
  label: string;
  data: Array<{ label: string; value: string }>;
  onSelect: (item: { label: string; value: string }) => void;
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});

export default function Dropdown({ label, data, onSelect }: DropdownProps) {
  const [visible, setVisible] = useState(false);
  const { width: W, height: H } = Dimensions.get('window');
  // const DropdownButton = useRef<TouchableOpacity>(null);
  const DropdownButton = useRef();
  // const refList = useRef<FlatList>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [position, setPosition] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selected, setSelected] = useState<any>(null);

  const measure = () => {
    console.log('hi2');
    console.log(DropdownButton);
    DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
      // setDropdownTop(500);
    });
  };
  // DropdownButton.current = 2;
  // if (DropdownButton?.current) {
  //   DropdownButton.current.measure((_width, _height, px, py, fx, fy) => {
  //     const isFull = false;
  //     const w = Math.floor(px);
  //     const top = isFull ? 20 : Math.floor(py) + Math.floor(fy) + 2;
  //     const bottom = H - top;
  //     const left = Math.floor(fx);

  //     // setDropdownTop(top);
  //     setDropdownTop(py + H);

  //     console.log(dropdownTop);
  //     // setDropdownTop(500)
  // setPosition({
  //   isFull,
  //   w,
  //   top,
  //   bottom: Math.floor(bottom),
  //   left,
  //   height: Math.floor(py),
  // });
  // });
  // }, [H, W]);

  // const openDropdown = (): void => {
  //   measure();
  //   setVisible(true);
  // };

  // const toggleDropdown = (): void => {
  //   if (visible) {
  //     setVisible(false);
  //   } else {
  //     openDropdown();
  //   }
  // };
  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const onItemPress = (item: { label: string; value: string }): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };
  // const renderItem = (item: { label: string; value: string }): ReactElement => (
  // const renderItem = (item: ReactElement) => (
  // const renderItem = (item: { label: string; value: string }) => (
  const renderItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: { label: string; value: string } }) => (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Text>{item.label}</Text>
      </TouchableOpacity>
    ),
    [],
  );

  const renderDropdown = () => {
    if (visible) {
      measure();
      console.log('hi!');
      return (
        <Modal visible={visible} transparent animationType="none">
          {/* <TouchableOpacity style={styles.button} onPress={toggleDropdown}> */}
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          {/* </TouchableOpacity> */}
        </Modal>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={styles.button}
      ref={DropdownButton}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>{selected?.label || label}</Text>
      {/* <Text style={styles.buttonText}>Hello</Text> */}
      <AntDesign name="down" />
    </TouchableOpacity>
  );
}
function ref<T>(arg0: null) {
  throw new Error('Function not implemented.');
}
