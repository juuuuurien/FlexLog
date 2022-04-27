import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  Button,
  DataTable,
  TextInput,
  IconButton,
  TouchableRipple,
  Portal,
  useTheme,
} from "react-native-paper";

import { PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  Layout,
  FadeInDown,
  SlideOutLeft,
  FadeOut,
  combineTransition,
  FadeIn,
  StretchInY,
  SequencedTransition,
} from "react-native-reanimated";

const SwipeToDelete = ({ style, children, deleteFn, id }) => {
  const { colors } = useTheme();
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const translateX = useSharedValue(0);
  const fadeOut = useSharedValue(0);
  const animatedHeight = useSharedValue(48);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      fadeOut.value = 1;
    },
    onActive: (event, ctx) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    },
    onEnd: (event, ctx) => {
      if (event.translationX < -SCREEN_WIDTH / 4 || event.velocityX < -1300) {
        fadeOut.value = withTiming(0);
        translateX.value = withTiming(-SCREEN_WIDTH, {}, (isFinished) => {
          if (isFinished) {
            runOnJS(deleteFn)(id);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  //   animated styles
  const animatedSlideStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedFadeStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeOut.value,
    };
  });

  //   regular styles
  const styles = StyleSheet.create({
    trashCanContainer: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      position: "absolute",
      backgroundColor: colors.error,
      justifyContent: "flex-end",
    },
    row: {
      backgroundColor: colors.cardColor,
      paddingHorizontal: 30,
    },
    offsetTitle: {
      marginLeft: 10,
      justifyContent: "space-around",
    },
    textInput: {
      backgroundColor: colors.cardColorLight,
      textAlign: "center",
      width: 72,
    },
  });

  return (
    <Animated.View style={style} layout={Layout} entering={FadeIn}>
      <Animated.View
        layout={Layout}
        style={[styles.trashCanContainer, animatedFadeStyle]}
      >
        <IconButton icon="trash-can-outline" />
      </Animated.View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[animatedSlideStyle]}>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default SwipeToDelete;
