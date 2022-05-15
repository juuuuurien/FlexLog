import { Menu, IconButton, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import React, { useContext, useState, useCallback } from "react";
import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";
import { UserDataContext } from "../../../../context/UserDataContext";
import { create_uid } from "../../../../util/create_uid";
import { useDispatch, useSelector } from "react-redux";
import { createSetFromTemplate } from "../../../../../redux/slices/workoutsSlice";

const ExerciseSettingsDots = ({
  exercise_id,
  handleDeleteExercise,
  handleAddFromTemplate,
  setTemplateModalVisible,
}) => {
  const { colors } = useTheme();

  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  const workoutData = useSelector((state) => state.workouts.workouts);

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
