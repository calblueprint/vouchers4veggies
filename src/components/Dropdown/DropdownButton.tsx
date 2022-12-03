// import { Styles } from './styles';
import { Colors } from '../../../assets/Colors';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from './Dropdown';
import { AntDesign } from '@expo/vector-icons';

export const DropdownButton = (props: any) => {
  const [value, setValue] = useState(null);

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={props.data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      dropdownPosition={props.dropdownPosition}
      placeholder={props.title}
      activeColor={Colors.lightMagenta}
      value={value}
      onChange={item => {
        setValue(item.value);
        props.onChange();
      }}
      renderItem={renderItem}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" name="down" size={20} />
      )}
      renderRightIcon={() => null}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.midGray,
    paddingHorizontal: 14,
    paddingVertical: 5,
    width: 200,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    width: 'auto',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
