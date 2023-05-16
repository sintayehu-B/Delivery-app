import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";

import "../constants/colors";
import colors from "../constants/colors";
const style = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
  separator: {
    backgroundColor: colors.separator,
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
  },
});
export const RowItem = ({ onPress, ClassName, ClassNames, rightIcon }) => {
  return (
    <TouchableOpacity style={style.row} onPress={onPress}>
      <Text style={style.text} className={ClassName}>
        Deliver Now
      </Text>
      {rightIcon}
      <View style={style.separator} />
      {/* <Text style={style.text} className={ClassNames}>
        Current Location
      </Text> */}
    </TouchableOpacity>
  );
};

export default RowItem;
