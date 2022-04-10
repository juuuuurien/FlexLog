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

import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";

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
} from "react-native-reanimated";
import { UserDataContext } from "../../../../context/UserDataContext";

const ExerciseTableSet = ({ set_count, exerciseIndex, setIndex }) => {
  const { colors } = useTheme();
  const { workoutData, setWorkoutData, id } = useContext(WorkoutDataContext);
  const { state, dispatch } = useContext(UserDataContext);

  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [pressed, setPressed] = useState(false);

  const setWeightFromState =
    workoutData.exercises[exerciseIndex].sets[setIndex].weight;
  const setRepsFromState =
    workoutData.exercises[exerciseIndex].sets[setIndex].reps;

  useEffect(() => {
    setWeight(setWeightFromState);
    setReps(setRepsFromState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutData]);

  const handleWeightBlur = () => {
    // after editing text
    // create new array and update weight in this set
    if (setWeightFromState !== weight) {
      const newExerciseArray = [...workoutData.exercises];
      newExerciseArray[exerciseIndex].sets[setIndex] = {
        ...newExerciseArray[exerciseIndex].sets[setIndex],
        weight: weight,
      };
      setWorkoutData({ ...workoutData, exercises: [...newExerciseArray] });
    }
  };

  const handleRepsBlur = () => {
    // after editing text
    // create new array and update reps in this set
    if (setRepsFromState !== reps) {
      const newExerciseArray = [...workoutData.exercises];
      newExerciseArray[exerciseIndex].sets[setIndex] = {
        ...newExerciseArray[exerciseIndex].sets[setIndex],
        reps: reps,
      };
      setWorkoutData({ ...workoutData, exercises: [...newExerciseArray] });
    }
  };

  const handleWeightChange = (value) => {
    setWeight(value.toString());
  };

  const handleRepsChange = (value) => {
    setReps(value.toString());
  };

  const handleSetDelete = useCallback(() => {
    dispatch({
      type: "DELETE_SET",
      payload: { id: id, setIndex: setIndex, exerciseIndex: exerciseIndex },
    });
  }, [workoutData.exercises]);

  const dismissDelete = () => (pressed ? setPressed(false) : null);

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
      flex: 1,
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

  // ANIMATIONS ==========================================
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const translateX = useSharedValue(0);
  const fadeOut = useSharedValue(0);
  const animatedHeight = useSharedValue(48);

  useEffect(() => {
    translateX.value = 0;
    animatedHeight.value = 48;
  }, [workoutData]);

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
            runOnJS(handleSetDelete)(setIndex, exerciseIndex);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

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

  // const animatedRowStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         translateX: translateX.value,
  //       },
  //     ],
  //   };
  // });

  return (
    <Animated.View
      layout={Layout}
      exiting={SlideOutLeft}
      entering={FadeInDown.delay(200)}
    >
      <Animated.View style={[styles.trashCanContainer, animatedFadeStyle]}>
        <IconButton icon="trash-can-outline" />
      </Animated.View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[animatedSlideStyle]}>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell>{set_count}</DataTable.Cell>
            <DataTable.Cell style={styles.offsetTitle} numeric>
              <TextInput
                disabled={workoutData.finished}
                dense
                underlineColor="transparent"
                keyboardType="numeric"
                style={styles.textInput}
                value={weight}
                onFocus={dismissDelete}
                onChangeText={handleWeightChange}
                onBlur={handleWeightBlur}
                maxLength={3}
              />
            </DataTable.Cell>
            <DataTable.Cell style={styles.offsetTitle} numeric>
              <TextInput
                disabled={workoutData.finished}
                dense
                underlineColor="transparent"
                keyboardType="numeric"
                style={styles.textInput}
                value={reps}
                onFocus={dismissDelete}
                onChangeText={handleRepsChange}
                onBlur={handleRepsBlur}
                maxLength={3}
              />
            </DataTable.Cell>
          </DataTable.Row>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default ExerciseTableSet;
