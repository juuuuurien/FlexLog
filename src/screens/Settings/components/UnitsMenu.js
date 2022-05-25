import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Text, Menu } from "react-native-paper";
import { useDispatch } from "react-redux";
import { updateWeightUnits } from "../../../../redux/slices/settingsSlice";
import { useTheme } from "@react-navigation/native";

const UnitsMenu = ({ weightUnits, style }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const { colors } = useTheme();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handlePress = (type) => {
    dispatch(updateWeightUnits(type));
    closeMenu();
  };

  console.log(weightUnits);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity
          style={[
            styles.touchable,
            style,
            { backgroundColor: colors.inputBackground },
          ]}
          onPress={openMenu}
        >
          <Text style={{ fontSize: 18 }}>{`${weightUnits}`}</Text>
        </TouchableOpacity>
      }
    >
      <Menu.Item title={"lbs"} onPress={() => handlePress("lbs")} />
      <Menu.Item title={"kgs"} onPress={() => handlePress("kgs")} />
    </Menu>
  );
};

export default UnitsMenu;

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    width: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
