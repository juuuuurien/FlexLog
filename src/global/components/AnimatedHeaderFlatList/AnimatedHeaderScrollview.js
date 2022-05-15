import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Animated, {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

const AnimatedHeaderScrollview = ({
  style,
  contentContainerStyle,
  data,
  extraData,
  renderItem,
  headerOptions,
  ...rest
}) => {
  const HEADER_HEIGHT_MAX = 200;
  const HEADER_HEIGHT_MIN = 80;
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

  const scrollY = useSharedValue(0);

  useEffect(() => {
    scrollY.value = 0;
  }, [state.workouts]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerContainer = useAnimatedStyle(() => {
    const height = HEADER_HEIGHT_MAX - scrollY.value;

    return {
      width: "100%",
      position: "absolute",
      flexDirection: "column",
      height: height > HEADER_HEIGHT_MIN ? height : HEADER_HEIGHT_MIN,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: 14,
      backgroundColor: colors.background,
      elevation: 5,
    };
  });

  const jumboFontStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, (HEADER_HEIGHT_MIN * 2) / 3],
      [1, 0]
    );

    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_MIN],
      [0, 55],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    );

    return {
      color: "#FFF",
      fontSize: 28,
      fontWeight: "bold",
      opacity: opacity,
      transform: [{ translateY: translateY }],
    };
  });

  const headerLabelContainer = useAnimatedStyle(() => {
    const translateContentY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_MIN],
      [0, STATUS_BAR_HEIGHT],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    );
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_MIN],
      [HEADER_HEIGHT_MIN, HEADER_HEIGHT_MIN + STATUS_BAR_HEIGHT],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    );
    return {
      height: HEADER_HEIGHT_MIN,
      transform: [{ translateY: STATUS_BAR_HEIGHT / 2 }],
    };
  });

  return (
    <>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        refreshing
        data={state.workouts}
        extraData={refreshing}
        renderItem={({ item, index }) => {
          //   item, id, navigation, index, handleDelete
          return (
            <ListItem
              item={item}
              id={item.id}
              navigation={navigation}
              index={index}
              handleDelete={handleDeleteItem}
              keyExtractor={(item) => item.id}
            />
          );
        }}
      />
    </>
  );
};

export default AnimatedHeaderScrollview;

const styles = StyleSheet.create({});
