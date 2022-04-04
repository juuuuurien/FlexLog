import React, { useState, useContext, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  TextInput,
  Colors,
  Button,
  Menu,
  Modal,
  useTheme,
  Divider,
  Subheading,
} from "react-native-paper";
import Animated, { FadeOut, SlideInDown } from "react-native-reanimated";
import { WorkoutDataContext } from "../../../context/WorkoutDataContext";
import ExerciseTable from "./ExerciseTable/ExerciseTable";
import ExerciseSettingsDots from "./Buttons/ExerciseSettingsDots";
import AddSetButton from "./Buttons/AddSetButton";
import ExerciseTemplateModal from "./Modals/ExerciseTemplateModal";
import ExerciseNotesModal from "./Modals/ExerciseNotesModal";

const ExerciseComponent = ({ exerciseData, exerciseIndex }) => {
  const { colors } = useTheme();
  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [notesModalVisible, setNotesModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setName(exerciseData.exercise_name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutData]);

  const handleNameChange = (str) => {
    setName(str);
  };

  const handleBlur = () => {
    if (workoutData.exercises[exerciseIndex].exercise_name !== name) {
      let newExercises = workoutData.exercises;
      newExercises[exerciseIndex].exercise_name = name;
      setWorkoutData({ ...workoutData, exercises: [...newExercises] });
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
    setWorkoutData({ ...workoutData, exercises: newExercises });
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
    <Animated.View entering={SlideInDown} exiting={FadeOut}>
      <View style={styles.exercise}>
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
            <Button
              onPress={() => setNotesModalVisible(true)}
              icon="pencil-outline"
            >
              Notes
            </Button>
            <ExerciseSettingsDots
              style={{ margin: 0 }}
              exerciseIndex={exerciseIndex}
              exerciseData={exerciseData}
              templateModalVisible={templateModalVisible}
              setTemplateModalVisible={setTemplateModalVisible}
            />
          </View>
          <View>
            <Subheading style={{ paddingHorizontal: 12 }}>
              {`${workoutData.exercises[exerciseIndex].sets.length} sets x ${
                workoutData.exercises[exerciseIndex].sets.length > 0
                  ? workoutData.exercises[exerciseIndex].sets[0].reps === ""
                    ? "0"
                    : workoutData.exercises[exerciseIndex].sets[0].reps
                  : "0"
              } reps`}
            </Subheading>
          </View>
        </View>
        <ExerciseTable>
          <ExerciseTable.Header labels={["set", "weight", "reps"]} />
          {exerciseData.sets &&
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
            setWorkoutData={setWorkoutData}
          />
        )}
      </View>
    </Animated.View>
  );
};

export default ExerciseComponent;
