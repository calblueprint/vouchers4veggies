import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import { H3_Subheading, Body_2_Subtext, Body_1_Text } from '../../assets/Fonts';
import Icon from 'react-native-vector-icons/AntDesign';

export const TransactionCard = (props: any) => {
  return (
    <View style={styles.row}>
      <View style={styles.left_align}>
        <Body_2_Subtext>ID {props.id}</Body_2_Subtext>
        <Body_1_Text>{props.date}</Body_1_Text>
      </View>
      <Body_1_Text style={{ ...styles.spacing, ...styles.right_align }}>
        x{props.count}
      </Body_1_Text>
      <H3_Subheading style={styles.right_align_long}>
        ${props.price}
      </H3_Subheading>
      <Icon.Button
        name="right"
        size={25}
        style={{ ...styles.icon_button }}
        color="#A9A9A9"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopStyle: 'solid',
    borderBottomStyle: 'solid',
    borderRadius: 2,
    borderColor: '#f2f2f2',
    width: '100%',
  },
  left_align: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'flex-start',
    paddingLeft: 20,
  },
  right_align: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  right_align_long: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  icon_button: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  spacing: {
    marginRight: 30,
  },
});
