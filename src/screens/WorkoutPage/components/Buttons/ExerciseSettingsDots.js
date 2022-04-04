import { Menu, IconButton, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";

const ExerciseSettingsDots = ({
  exerciseIndex,
  exerciseData,
  templateModalVisible,
  setTemplateModalVisible,
}) => {
  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);
  const { colors } = useTheme();

  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  const handleAddFromTemplate = (sets, reps, weight) => {
    const set = { weight: weight, reps: reps };
    let newSetArray = [];
    for (let i = 0; i < sets; i++) {
      newSetArray.push(set);
    }

    console.log(newSetArray);

    const newExercises = workoutData.exercises;
    newExercises[exerciseIndex].sets = newSetArray;
    setWorkoutData({ ...workoutData, exercises: newExercises });
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <IconButton
          icon="dots-vertical"
          color={colors.primary}
          size={28}
          onPress={() => (workoutData.finished ? null : setMenuVisible(true))}
        />
      }
    >
      <Menu.Item
        onPress={() => {
          setMenuVisible(false);
          const oldExerciseArray = [...workoutData.exercises];
          oldExerciseArray.splice(exerciseIndex, 1);
          setWorkoutData({ ...workoutData, exercises: oldExerciseArray });
        }}
        title="Remove Exercise"
        icon={"trash-can-outline"}
      />

      <Menu
        contentStyle={{ alignItems: "center" }}
        visible={subMenuVisible}
        onDismiss={() => setSubMenuVisible(false)}
        anchor={
          <Menu.Item
            onPress={() => setSubMenuVisible(true)}
            title="Use Template"
            icon={"file-document-outline"}
          />
        }
      >
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            setSubMenuVisible(false);
            handleAddFromTemplate("5", "5", "");
          }}
          title="5 x 5"
        ></Menu.Item>
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            setSubMenuVisible(false);
            handleAddFromTemplate("3", "8", "");
          }}
          title="3 x 8"
        />
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            setSubMenuVisible(false);
            handleAddFromTemplate("3", "12", "");
          }}
          title="3 x 12"
        />
        <Menu.Item
          onPress={() => {
            setMenuVisible(false);
            setSubMenuVisible(false);
            setTemplateModalVisible(true);
          }}
          title="Custom"
        />
      </Menu>
    </Menu>
  );
};


export default ExerciseSettingsDots;
