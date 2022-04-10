import React, { useState, useContext, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput, useTheme, IconButton } from "react-native-paper";
import Animated, {
  Layout,
  SlideOutLeft,
  FadeInDown,
  SequencedTransition,
  FadeOutDown,
} from "react-native-reanimated";
import { WorkoutDataContext } from "../../../context/WorkoutDataContext";
import { UserDataContext } from "../../../context/UserDataContext";

import ExerciseTable from "./ExerciseTable/ExerciseTable";
import ExerciseSettingsDots from "./Buttons/ExerciseSettingsDots";
import AddSetButton from "./Buttons/AddSetButton";
import ExerciseTemplateModal from "./Modals/ExerciseTemplateModal";
import ExerciseNotesModal from "./Modals/ExerciseNotesModal";
import SetsByRepsComponent from "./SetsByRepsComponent";
import { useCallback } from "react";

const ExerciseComponent = ({ exerciseData, exerciseIndex }) => {
  const { colors } = useTheme();
  const { workoutData, id } = useContext(WorkoutDataContext);
  console.log(id);
  const { state, dispatch } = useContext(UserDataContext);
  const [name, setName] = useState(exerciseData.exercise_name);
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [notesModalVisible, setNotesModalVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutData]);

  const handleNameChange = (str) => {
    setName(str);
  };

  const handleBlur = () => {
    if (
      workoutData.exercises[exerciseIndex].exercise_name !== name &&
      name.length > 0
    ) {
      const _arr = name.trim().split(" ");
      const _name = _arr
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");

      let newExerciseArray = workoutData.exercises;
      newExerciseArray[exerciseIndex].exercise_name = _name;
      dispatch({
        type: "UPDATE_EXERCISE",
        payload: { id: id, data: newExerciseArray },
      });
    }
  };

  const handleAddFromTemplate = (sets, reps, weight) => {
    const set = { weight: weight, reps: reps };
    let newSetArray = [];
    for (let i = 0; i < sets; i++) {
      newSetArray.push(set);
    }

    const newExercises = workoutData.exercises;
    newExercises[exerciseIndex].sets = newSetArray;
  };

  const styles = StyleSheet.create({
    exerciseHeaderContainer: {
      flex: 1,
      paddingHorizontal: 14,
      justifyContent: "space-between",
    },

    textInput: {
      flex: 1,
      color: colors.primary,
      backgroundColor: "transparent",
      height: 48,
      fontSize: 24,
      lineHeight: 3,
    },
    exercise: {
      marginHorizontal: 18,
      marginTop: 18,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors.cardColor,
    },
  });

  return (
    <Animated.View
      style={styles.exercise}
      layout={Layout}
      entering={FadeInDown}
      exiting={FadeOutDown}
    >
      <View style={styles.exerciseHeaderContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            placeholder="'Exercise'"
            style={styles.textInput}
            value={name}
            underlineColor="none"
            activeUnderlineColor="transparent"
            selectionColor={colors.primary}
            onChangeText={handleNameChange}
            onBlur={handleBlur}
            onEndEditing={handleBlur}
            disabled={workoutData.finished}
          />
          <IconButton
            onPress={() => setNotesModalVisible(true)}
            icon="file-document-edit"
            color={colors.primary}
          />
          <ExerciseSettingsDots
            style={{ margin: 0 }}
            exerciseIndex={exerciseIndex}
            exerciseData={exerciseData}
            templateModalVisible={templateModalVisible}
            setTemplateModalVisible={setTemplateModalVisible}
          />
        </View>
        <View>
          <SetsByRepsComponent
            exerciseData={exerciseData}
            exerciseIndex={exerciseIndex}
          />
        </View>
      </View>
      <ExerciseTable>
        <ExerciseTable.Header labels={["set", "weight", "reps"]} />
        {state.workouts[id].exercises[exerciseIndex].sets &&
          exerciseData.sets.map((data, i) => {
            return (
              <ExerciseTable.Set
                key={i}
                setIndex={i}
                exerciseIndex={exerciseIndex}
                set_count={i + 1}
                setData={data}
              />
            );
          })}
      </ExerciseTable>
      <ExerciseTemplateModal
        handleAddFromTemplate={handleAddFromTemplate}
        templateModalVisible={templateModalVisible}
        setTemplateModalVisible={setTemplateModalVisible}
      />
      <ExerciseNotesModal
        exerciseIndex={exerciseIndex}
        notesModalVisible={notesModalVisible}
        setNotesModalVisible={setNotesModalVisible}
        exerciseName={exerciseData.exercise_name}
      />
      {!workoutData.finished && (
        <AddSetButton
          workoutData={workoutData}
          exerciseIndex={exerciseIndex}
          exerciseData={exerciseData}
        />
      )}
    </Animated.View>
  );
};

export default ExerciseComponent;
