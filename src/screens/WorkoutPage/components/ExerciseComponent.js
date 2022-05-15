import React, { useState, useContext, useEffect, useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput, useTheme, IconButton } from "react-native-paper";
import Animated, {
  Layout,
  FadeInUp,
  FadeOutDown,
} from "react-native-reanimated";
import { WorkoutDataContext } from "../../../context/WorkoutDataContext";
import ExerciseTable from "./ExerciseTable/ExerciseTable";
import ExerciseSettingsDots from "./Buttons/ExerciseSettingsDots";
import AddSetButton from "./Buttons/AddSetButton";
import ExerciseTemplateModal from "./Modals/ExerciseTemplateModal";
import ExerciseNotesModal from "./Modals/ExerciseNotesModal";
import SetsByRepsComponent from "./SetsByRepsComponent";
import { create_uid } from "../../../util/create_uid";
import { capitalize } from "../../../util/capitalize";
import { useDispatch } from "react-redux";
import {
  createSet,
  createSetFromTemplate,
  deleteSet,
  updateExercise,
} from "../../../../redux/slices/workoutsSlice";

const ExerciseComponent = ({
  exerciseData,
  exerciseIndex,
  handleDeleteExercise,
}) => {
  const { colors } = useTheme();
  const { workoutData, workoutIndex, id } = useContext(WorkoutDataContext);
  const [name, setName] = useState(exerciseData.exercise_name);
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [notesModalVisible, setNotesModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setName(exerciseData.exercise_name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutData.name]);

  const handleNameChange = (str) => {
    setName(str);
  };

  const handleBlur = () => {
    const _name = capitalize(name);
    setName(_name);
    dispatch(
      updateExercise({
        exerciseIndex: exerciseIndex,
        workoutIndex: workoutIndex,
        data: { exercise_name: _name },
      })
    );
  };

  const handleAddFromTemplate = useCallback(
    (sets, reps, weight) => {
      let newSetArray = [];
      for (let i = 0; i < sets; i++) {
        const set = { weight: weight, reps: reps, id: create_uid() };
        newSetArray.push(set);
      }

      dispatch(
        createSetFromTemplate({
          workoutIndex: workoutIndex,
          exerciseIndex: exerciseIndex,
          newSets: newSetArray,
        })
      );
    },
    [workoutData.exercises]
  );

  const handleAddSet = useCallback(() => {
    dispatch(
      createSet({ workoutIndex: workoutIndex, exerciseIndex: exerciseIndex })
    );
  }, [workoutData.exercises]);

  const handleDeleteSet = useCallback(
    (set_id) => {
      dispatch(
        deleteSet({
          setId: set_id,
          workoutIndex: workoutIndex,
          exerciseIndex: exerciseIndex,
        })
      );
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
      fontSize: 24,
    },
    exercise: {
      marginTop: 18,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors.surfaceLight,
    },
  });
  return (
    <Animated.View
      layout={Layout}
      entering={FadeInUp}
      exiting={FadeOutDown.duration(150)}
      style={styles.exercise}
    >
      <View style={styles.exerciseHeaderContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            placeholder="'Name'"
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
            workoutIndex={workoutIndex}
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
                workoutIndex={workoutIndex}
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
