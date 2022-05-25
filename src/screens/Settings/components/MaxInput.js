import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { TextInput, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateMaxes } from "../../../../redux/slices/settingsSlice";

const MaxInput = ({ weight, weightUnits, style, type }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [cache, setCache] = useState();
  const [val, setVal] = useState();

  const { colors } = useTheme();

  const handleChange = (text) => setVal(text);

  const handleFocus = () => {
    setCache(weight);
    setVal("");
  };

  const handleEndEditing = () => {
    if (val === "") {
      setVal(`${cache} ${weightUnits}`); // if no change, set back to original value
    } else {
      setVal(`${val} ${weightUnits}`); //  append state with units
    }
    dispatch(updateMaxes({ [type]: val })); // merge value into state
  };

  const handleError = () => {
    if (cache === "" && val === "") return true;

    return false;
  };

  useEffect(() => {
    setVal(`${weight} ${weightUnits}`);
  }, [weightUnits]);

  useEffect(() => {
    handleError();
  }, [val]);

  return (
    <TextInput
      style={[style, styles.input, { backgroundColor: colors.inputBackground }]}
      dense
      error={handleError()}
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
