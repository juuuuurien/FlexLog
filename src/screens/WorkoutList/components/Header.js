import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  STATUS_BAR_HEIGHT,
  HEADER_HEIGHT_MIN,
} from "../../../global/constants";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Header</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: HEADER_HEIGHT_MIN,
    flexDirection: "row",
    backgroundColor: "pink",
    alignItems: "center",
    paddingTop: STATUS_BAR_HEIGHT,
    padding: 6,
  },
  title: {
    color: "white",
  },
});
