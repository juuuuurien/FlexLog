import { Menu, IconButton, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import React, { useContext, useState, useCallback } from "react";
import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";
import { UserDataContext } from "../../../../context/UserDataContext";
import { create_uid } from "../../../../util/create_uid";

const ExerciseSettingsDots = ({
  exercise_id,
  exerciseIndex,
  handleDeleteExercise,
  handleAddFromTemplate,
  templateModalVisible,
  setTemplateModalVisible,
}) => {
  const { workoutData, setWorkoutData, id } = useContext(WorkoutDataContext);
  const { state, dispatch } = useContext(UserDataContext);
  const { colors } = useTheme();

  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  // const handleAddFromTemplate = (sets, reps, weight) => {
  //   let newSetArray = [];
  //   for (let i = 0; i < sets; i++) {
  //     const set = { weight: weight, reps: reps, id: create_uid() };
  //     newSetArray.push(set);
  //   }

  // console.log(workoutData.exercises)
  //   const newExercises = [...workoutData.exercises];
  //   // newExercises[exerciseIndex].sets = newSetArray;
  //   // setWorkoutData({ ...workoutData, exercises: newExercises });
  // };



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
          handleDeleteExercise(exercise_id);
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
