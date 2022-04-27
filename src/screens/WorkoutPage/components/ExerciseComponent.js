import React, { useState, useContext, useEffect, useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput, useTheme, IconButton } from "react-native-paper";
import Animated, {
  Layout,
  SlideOutLeft,
  FadeInDown,
  SequencedTransition,
  StretchInY,
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
import { create_uid } from "../../../util/create_uid";
import { capitalize } from "../../../util/capitalize";

const ExerciseComponent = ({
  exerciseData,
  exerciseIndex,
  handleDeleteExercise,
}) => {
  const { colors } = useTheme();
  const { workoutData, setWorkoutData, id } = useContext(WorkoutDataContext);
  const { state, dispatch } = useContext(UserDataContext);
  const [name, setName] = useState(exerciseData.exercise_name);
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [notesModalVisible, setNotesModalVisible] = useState(false);

  useEffect(() => {
    setName(exerciseData.exercise_name);
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
      const _name = capitalize(name);

      let newExerciseArray = workoutData.exercises;
      newExerciseArray[exerciseIndex].exercise_name = _name;
      setName(_name);
      setWorkoutData({ ...workoutData, exercises: newExerciseArray });
    }
  };

 const handleAddFromTemplate = useCallback((sets, reps, weight) => {
         let newSetArray = [];
    for (let i = 0; i < sets; i++) {
      const set = { weight: weight, reps: reps, id: create_uid() };
      newSetArray.push(set);
    }
    const exercises = [...workoutData.exercises];
    exercises[exerciseIndex].sets = newSetArray;

    setWorkoutData((data) => {
      return { ...data, exercises: exercises };
    });
  }, [workoutData.exercises]);

  const handleAddSet = useCallback(() => {
    const exercises = [...workoutData.exercises];
    exercises[exerciseIndex].sets = [
      ...exerciseData.sets,
      { weight: "", reps: "", id: create_uid() },
    ];

    setWorkoutData((data) => {
      return { ...data, exercises: exercises };
    });
  }, [workoutData.exercises]);

  const handleDeleteSet = useCallback(
    (set_id) => {
      const newSets = exerciseData.sets.filter((e, i) => {
        return e.id !== set_id;
      });
      const newExercises = [...workoutData.exercises];
      newExercises[exerciseIndex].sets = newSets;

      setWorkoutData((data) => {
        return { ...data, exercises: [...newExercises] };
      });
    },
    [workoutData.exercises]
  );
  const styles = StyleSheet.create({
    exerciseHeaderContainer: {
      flex: 1,
      paddingHorizontal: 22,
      justifyContent: "space-between",
      elevation: 3,
    },
    exerciseNameInput: {
      flex: 1,
      color: colors.primary,
      height: 48,
      backgroundColor: "transparent",
      paddingHorizontal: 0,
      fontSize: 20,
      lineHeight: 3,
    },
    exercise: {
      marginHorizontal: 18,
      marginTop: 18,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors.surface,
    },
  });
  return (
    <Animated.View
      layout={Layout}
      entering={FadeInDown.delay(200)}
      exiting={FadeOutDown.duration(150)}
      style={styles.exercise}
    >
      <View style={styles.exerciseHeaderContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            placeholder="'Exercise'"
            style={styles.exerciseNameInput}
            value={name}
            underlineColor="transparent"
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
            exercise_id={exerciseData.id}
            exerciseIndex={exerciseIndex}
            handleDeleteExercise={handleDeleteExercise}
            handleAddFromTemplate={handleAddFromTemplate}
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
        {exerciseData &&
          exerciseData.sets.map((set, i) => {
            // the reason layout animations aren't working is because
            // each element doesn't have a unique key.
            // Need to have each set have a unique key when creating it.
            return (
              <ExerciseTable.Set
                key={set.id}
                set_id={set.id}
                setIndex={i}
                exerciseIndex={exerciseIndex}
                set_count={i + 1}
                setData={set}
                handleDeleteSet={handleDeleteSet}
              />
            );
          })}
        <AddSetButton
          workoutData={workoutData}
          exerciseIndex={exerciseIndex}
          exerciseData={exerciseData}
          handleAddSet={handleAddSet}
        />
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
    </Animated.View>
  );
};

export default ExerciseComponent;
