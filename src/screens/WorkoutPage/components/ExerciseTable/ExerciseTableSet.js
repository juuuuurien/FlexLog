import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { DataTable, IconButton, useTheme } from "react-native-paper";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { updateSet } from "../../../../../redux/slices/workoutsSlice";

import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";

import SwipeToDelete from "../../../../global/components/animations/SwipeToDelete";

const ExerciseTableSet = ({
  set_count,
  workoutIndex,
  exerciseIndex,
  setIndex,
  setData,
  handleDeleteSet,
}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { workoutData } = useContext(WorkoutDataContext);
  const [weight, setWeight] = useState(setData.weight);
  const [reps, setReps] = useState(setData.reps);

  const animatedColorValue = useSharedValue(0);

  useEffect(() => {
    setWeight(setData.weight);
    setReps(setData.reps);

    animatedColorValue.value = withTiming(!setData.finished ? 0 : 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutData]);

  const handleWeightBlur = () => {
    dispatch(
      updateSet({
        workoutIndex,
        exerciseIndex,
        setIndex,
        data: { weight: weight },
      })
    );
  };

  const handleRepsBlur = () => {
    dispatch(
      updateSet({
        workoutIndex,
        exerciseIndex,
        setIndex,
        data: { reps: reps },
      })
    );
  };

  const handleWeightChange = (value) => setWeight(value);
  const handleRepsChange = (value) => setReps(value);

  const handleFinish = () =>
    dispatch(
      updateSet({
        workoutIndex,
        exerciseIndex,
        setIndex,
        data: { finished: !setData.finished },
      })
    );

  const animatedColorStyle = useAnimatedStyle(() => {
    const interpolatedColor = interpolateColor(
      animatedColorValue.value,
      [0, 1],
      [colors.surfaceLight, "#244E40"]
    );

    return { backgroundColor: interpolatedColor };
  });

  const animatedTextInputContainer = useAnimatedStyle(() => {
    const interpolatedColor = interpolateColor(
      animatedColorValue.value,
      [0, 1],
      [colors.surface, "#244E40"]
    );

    return {
      height: 40,
      width: 75,
      borderRadius: 10,
      backgroundColor: interpolatedColor,
    };
  });

  const styles = StyleSheet.create({
    trashCanContainer: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      position: "absolute",
      backgroundColor: colors.error,
      justifyContent: "flex-end",
    },
    cell: {
      flex: 1,
      flexDirection: "row",
      marginHorizontal: 4,
      height: "100%",
      justifyContent: "center",
    },
    row: {
      flex: 1,
      marginBottom: 4,
      borderBottomWidth: 0,
    },
    offsetTitle: {
      marginLeft: 10,
      justifyContent: "space-around",
    },
    textInput: {
      flex: 0,
      textAlign: "center",
      height: 40,
      width: 80,
      borderRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingVertical: 0,
      backgroundColor: "transparent",
      color: "white",
      fontSize: 16,
    },
  });

  return useMemo(() => {
    return (
      <SwipeToDelete deleteFn={handleDeleteSet} id={setData.id}>
        <Animated.View style={[animatedColorStyle, styles.row]}>
          <DataTable.Row>
            <DataTable.Cell
              style={[
                styles.cell,
                {
                  flex: 0,
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  borderRadius: 8,
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={{ color: "white" }}>{set_count}</Text>
            </DataTable.Cell>
            <DataTable.Cell style={[styles.cell, { flex: 0.75 }]}>
              {"-"}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell} numeric>
              <Animated.View style={animatedTextInputContainer}>
                <TextInput
                  dense
                  disabled={workoutData.finished}
                  placeholder={"lbs"}
                  placeholderTextColor={"gray"}
                  underlineColor="transparent"
                  keyboardType="numeric"
                  style={styles.textInput}
                  value={weight}
                  onChangeText={handleWeightChange}
                  onBlur={handleWeightBlur}
                  maxLength={3}
                />
              </Animated.View>
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell} numeric>
              <Animated.View style={animatedTextInputContainer}>
                <TextInput
                  dense
                  disabled={workoutData.finished}
                  placeholder={"reps"}
                  placeholderTextColor={"gray"}
                  underlineColor="transparent"
                  keyboardType="numeric"
                  style={styles.textInput}
                  value={reps}
                  onChangeText={handleRepsChange}
                  onBlur={handleRepsBlur}
                  maxLength={3}
                />
              </Animated.View>
            </DataTable.Cell>
            <DataTable.Cell
              style={[
                styles.cell,
                {
                  flex: 0,
                  width: 40,
                  height: 40,
                  alignSelf: "center",
                  borderRadius: 6,
                  justifyContent: "center",
                },
              ]}
            >
              <IconButton
                style={{
                  borderRadius: 6,
                  backgroundColor: setData.finished
                    ? "#54D971"
                    : colors.surface,
                }}
                icon="check"
                size={24}
                color={setData.finished ? "white" : colors.primary}
                onPress={handleFinish}
              />
            </DataTable.Cell>
          </DataTable.Row>
        </Animated.View>
      </SwipeToDelete>
    );
  }, [weight, reps, workoutData]);
};

export default ExerciseTableSet;
