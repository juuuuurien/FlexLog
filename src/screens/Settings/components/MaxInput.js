import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { TextInput, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateMaxes } from "../../../../redux/slices/settingsSlice";

const MaxInput = ({ weight, weightUnits, style, type }) => {
  const dispatch = useDispatch();
  const [val, setVal] = useState();

  const { colors } = useTheme();

  useEffect(() => {
    setVal(`${weight} ${weightUnits}`);
  }, [weightUnits]);

  const handleChange = (text) => setVal(text);

  const handleFocus = () => setVal(weight.toString());

  const handleEndEditing = () => {
    setVal(`${val} ${weightUnits}`); //  append state with units

    dispatch(updateMaxes({ [type]: val })); // merge value into state
  };

  return (
    <TextInput
      style={[style, styles.input, { backgroundColor: colors.inputBackground }]}
      dense
      dismissable
      keyboardType="numeric"
      onChangeText={handleChange}
      value={val}
      onEndEditing={handleEndEditing}
      onFocus={handleFocus}
      underlineColor="transparent"
    />
  );
};

export default MaxInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
