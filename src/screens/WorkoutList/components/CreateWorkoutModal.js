import React, { useContext, useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  Modal,
  Card,
  TextInput,
  Title,
  Button,
  HelperText,
  withTheme,
  useTheme,
} from "react-native-paper";
import dayjs from "dayjs";
import { create_uid } from "../../../util/create_uid";
import { capitalize } from "../../../util/capitalize";
import { UserDataContext } from "../../../context/UserDataContext";

const CreateWorkoutModal = ({ show, hide, visible }) => {
  const { colors } = useTheme();
  const { dispatch } = useContext(UserDataContext);
  const [inputData, setInputData] = useState("");
  const [descriptionData, setDescriptionData] = useState("");
  const [colorSelected, setColorSelected] = useState("#162227");
  const [isError, setIsError] = useState(false);

  const RadioButton = ({ color }) => {
    const SIZE = 25;

    if (color === "auto")
      return (
        <TouchableOpacity
          style={{
            padding: 5,
            borderRadius: 5,
            borderWidth: colorSelected === color ? 3 : 0,
            borderColor: colorSelected === color ? colors.text : "none",
            fontWeight: color === colorSelected ? "bold" : "normal",
          }}
          onPress={() => setColorSelected(color)}
        >
          <Text
            style={{
              color: color === colorSelected ? "white" : colors.subText,
            }}
          >
            {"auto"}
          </Text>
        </TouchableOpacity>
      );
    return (
      <TouchableOpacity onPress={() => setColorSelected(color)}>
        <View
          style={{
            height: colorSelected === color ? SIZE + 5 : SIZE,
            width: colorSelected === color ? SIZE + 5 : SIZE,
            borderRadius: 5,
            backgroundColor: color,
            borderWidth: colorSelected === color ? 3 : 0,
            borderColor: colorSelected === color ? colors.text : "none",
            elevation: 2,
          }}
        />
      </TouchableOpacity>
    );
  };

  const handleChange = (text) => {
    setInputData(text);
  };

  const handleBlur = () => {
    const capitalizedTitle = capitalize(inputData);

    setInputData(capitalizedTitle);
  };

  const handleDescriptionChange = (text) => {
    setDescriptionData(text);
  };

  const handleClose = () => {
    setInputData("");
    setDescriptionData("");
    setColorSelected("");
    setIsError(false);
    hide();
  };

  const handleCreate = () => {
    if (inputData.trim().length > 0) {
      dispatch({
        type: "CREATE_WORKOUT",
        payload: {
          id: create_uid(),
          data: {
            date: dayjs(),
            name: capitalize(inputData.trim()),
            exercises: [],
            started: false,
            finished: false,
            cardColor: colorSelected,
            description: descriptionData.trim(),
          },
        },
      });
    } else {
      setIsError(true);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: "100%",
      paddingVertical: 12,
      justifyContent: "space-evenly",
    },
    modalContainer: {
      height: "100%",
      margin: 22,
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      width: "100%",
      height: 360,
      padding: 12,
      borderRadius: 14,
    },
    labelColorContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    input: {
      height: 48,
      paddingHorizontal: 0,
      fontSize: 18,
      margin: 0,
      padding: 0,
      backgroundColor: "transparent",
    },
    description: {
      height: 82,
      fontSize: 14,
      paddingHorizontal: 0,
      margin: 0,
      padding: 0,
      backgroundColor: "transparent",
    },
  });

  return (
    <Modal
      visible={visible}
      animationPreset="slide"
      dismissable
      onDismiss={handleClose}
      contentContainerStyle={styles.modalContainer}
    >
      <Card style={styles.contentContainer}>
        <Card.Title titleStyle={{ fontSize: 24 }} title={"Log a new workout"} />
        <Card.Content style={styles.container}>
          <TextInput
            underlineColor="#89A9B8"
            error={isError}
            autoFocus
            placeholder={"Title"}
            style={styles.input}
            value={inputData}
            onChangeText={handleChange}
            onBlur={handleBlur}
          />
          {isError && (
            <HelperText style={{ color: colors.error }}>
              {"*Please enter a workout name"}
            </HelperText>
          )}
          <TextInput
            dense
            multiline
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            placeholder={"Tap to add description"}
            style={styles.description}
            maxLength={50}
            value={descriptionData}
            onChangeText={handleDescriptionChange}
          />
          <View style={styles.labelColorContainer}>
            <Text style={{ color: colors.text }}>{"Label color: "}</Text>
            <View style={styles.labelColorContainer}>
              <RadioButton color={"#162227"} />
              <RadioButton color={"#E7274A"} />
              <RadioButton color={"#1D83BD"} />
              <RadioButton color={"#53C86D"} />
              <RadioButton color={"#5828A7"} />
              <RadioButton color={"auto"} />
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={{ marginTop: 15, justifyContent: "flex-end" }}>
          <Button onPress={handleClose}>{"Cancel"}</Button>
          <Button
            mode="contained"
            onPress={() => {
              handleClose();
              handleCreate();
            }}
          >
            {"Create"}
          </Button>
        </Card.Actions>
      </Card>
    </Modal>
  );
};

export default withTheme(CreateWorkoutModal);
