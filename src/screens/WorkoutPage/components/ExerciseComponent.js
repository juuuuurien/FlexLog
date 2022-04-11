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
      const _arr = name.trim().split(" ");
      const _name = _arr
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");

      let newExerciseArray = workoutData.exercises;
      newExerciseArray[exerciseIndex].exercise_name = _name;
      setName(_name);
      setWorkoutData({ ...workoutData, exercises: newExerciseArray });
    }
  };

  const handleAddFromTemplate = (sets, reps, weight) => {
    const set = { weight: weight, reps: reps };
    let newSetArray = [];
    for (let i = 0; i < sets; i++) {
      newSetArray.push(set);
    }
    const newExerciseArray = workoutData.exercises;
    newExerciseArray[exerciseIndex].sets = newSetArray;
    setWorkoutData(
      setWorkoutData({ ...workoutData, exercises: [...newExerciseArray] })
    );
  };

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
    container: {
      marginHorizontal: 18,
      marginTop: 18,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors.cardColor,
    },
  });

  return (
    <Animated.View
      layout={SequencedTransition}
      entering={FadeInDown.delay(200)}
      exiting={FadeOutDown.duration(150)}
      style={styles.container}
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
            exercise_id={exerciseData.id}
            exerciseIndex={exerciseIndex}
            handleDeleteExercise={handleDeleteExercise}
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
