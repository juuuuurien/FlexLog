import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Colors, useTheme, Subheading } from "react-native-paper";
import { WorkoutDataContext } from "../../../context/WorkoutDataContext";
import ExerciseTable from "./ExerciseTable/ExerciseTable";
import ExerciseSettingsDots from "./Buttons/ExerciseSettingsDots";
import AddSetButton from "./Buttons/AddSetButton";
import ExerciseTemplateModal from "./ExerciseTemplateModal";

const ExerciseComponent = ({ exerciseData, exerciseIndex }) => {
  const { colors } = useTheme();
  const { grey400 } = Colors;
  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);
  const [name, setName] = useState("");
  const [templateModalVisible, setTemplateModalVisible] = useState(false);

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

  const styles = StyleSheet.create({
    textInputContainer: {
      flex: 1,
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: grey400,
      paddingHorizontal: 14,
      justifyContent: "space-between",
      textAlign: "center",
      alignItems: "center",
    },
    textInput: {
      flex: 1,
      color: colors.primary,
      backgroundColor: "transparent",
      height: 48,
      fontSize: 24,
      fontWeight: "bold",
      lineHeight: 3,
    },
    exercise: {
      borderRadius: 5,
      backgroundColor: colors.background,
      marginBottom: 15,
    },
  });

  return (
    <View style={styles.exercise}>
      <View style={styles.textInputContainer}>
        <View>
          <TextInput
            placeholder="'Workout Name'"
            style={styles.textInput}
            value={name}
            underlineColor="none"
            activeUnderlineColor="none"
            onChangeText={handleNameChange}
            onBlur={handleBlur}
            onEndEditing={handleBlur}
            disabled={workoutData.finished}
          />
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

        <ExerciseSettingsDots
          exerciseIndex={exerciseIndex}
          exerciseData={exerciseData}
          templateModalVisible={templateModalVisible}
          setTemplateModalVisible={setTemplateModalVisible}
        />
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
        templateModalVisible={templateModalVisible}
        setTemplateModalVisible={setTemplateModalVisible}
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
  );
};

export default ExerciseComponent;
