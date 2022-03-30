import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

const Loading = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        animating={true}
        color={colors.primary}
        size={"large"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});

export default Loading;
