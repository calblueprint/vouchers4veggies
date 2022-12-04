// import { Styles } from './styles';
import React, { useState, useRef, useCallback } from 'react';
import { Text, TouchableOpacity, Modal, View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Styles from './styles';
import Colors from '../../../assets/Colors';

type DropdownProps = {
  label: string;
  data: Array<{ label: string; value: string }>;
  onSelect: (item: { label: string; value: string }) => void;
};

export default function Dropdown({ label, data, onSelect }: DropdownProps) {
  const [visible, setVisible] = useState(false);
  const DropdownButton = useRef<TouchableOpacity>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selected, setSelected] = useState<unknown>();

  const measure = () => {
    DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
      // setDropdownTop(500);
    });
  };

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const test = () => {
    setSelected(8);
    console.log(selected);
  };

  const onItemPress = (item: { label: string; value: string }): void => {
    setSelected(8);
    console.log(selected);
    if (selected?.value === item.value) {
      console.log('testing');
      setSelected(null);
    } else {
      // console.log(selected?.value);
      console.log(item.value);
      // console.log(selected?.value === item.value);
      setSelected(item);
      console.log(selected);
      onSelect(item);
    }
    // console.log(selected?.label);
    setVisible(false);
  };

  const renderItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: { label: string; value: string } }) => (
      <TouchableOpacity style={Styles.item} onPress={() => onItemPress(item)}>
        <Text>{item.label}</Text>
      </TouchableOpacity>
    ),
    [],
  );

  const renderDropdown = () => {
    if (visible) {
      measure();
      return (
        <Modal visible={visible} transparent animationType="none">
          <View style={[Styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={Styles.button}
      ref={DropdownButton}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={Styles.buttonText}>{selected?.label || label}</Text>
      <AntDesign name="down" />
    </TouchableOpacity>
  );
}
