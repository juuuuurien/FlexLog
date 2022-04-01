import { Menu, IconButton, Button, useTheme } from "react-native-paper";
import React, { useContext, useState } from "react";
import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";

const ExerciseSettingsDots = ({ exerciseIndex }) => {
  const [visible, setVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);
  const { colors } = useTheme();

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <IconButton
          icon="dots-vertical"
          color={colors.primary}
          size={28}
          onPress={() => (workoutData.finished ? null : setVisible(true))}
        />
      }
    >
      <Menu.Item
        onPress={() => {
          setVisible(false);
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
            setVisible(false);
            setSubMenuVisible(false);
          }}
          title="5 x 5"
        ></Menu.Item>
        <Menu.Item onPress={() => {}} title="3 x 8" />
        <Menu.Item onPress={() => {}} title="3 x 12" />
        <Menu.Item onPress={() => {}} title="Custom" />
      </Menu>
    </Menu>
  );
};

export default ExerciseSettingsDots;
