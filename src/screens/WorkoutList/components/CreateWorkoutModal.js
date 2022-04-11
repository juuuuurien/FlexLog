import React, { useContext, useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
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
import { UserDataContext } from "../../../context/UserDataContext";

const CreateWorkoutModal = ({ showModal, setShowModal, handleOnPress }) => {
  const { colors } = useTheme();
  const { dispatch } = useContext(UserDataContext);
  const [inputData, setInputData] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (text) => {
    setInputData(text);
  };

  const handleClose = () => {
    setShowModal(false);
    setInputData("");
    setIsError(false);
  };

  const handlePress = () => {
    if (inputData.trim().length > 0) {
      dispatch({
        type: "CREATE_WORKOUT",
        payload: {
          id: create_uid(),
          data: {
            date: dayjs().format("MMM D, YY"),
            name: inputData.trim(),
            exercises: [],
            started: false,
            finished: false,
          },
        },
      });
      handleClose();
    } else {
      setIsError(true);
    }
  };

  const styles = StyleSheet.create({
    modalContainer: {
      margin: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    contentContainer: {
      padding: 10,
      width: "100%",
      borderRadius: 12,
    },
    input: {
      height: 48,
      fontSize: 22,
    },
  });

  return (
    <Modal
      visible={showModal}
      animationPreset="slide"
      onDismiss={handleClose}
      contentContainerStyle={styles.modalContainer}
    >
      <Card style={styles.contentContainer}>
        <Card.Title
          title={"Create a Workout"}
          subtitle={"What are you working out today?"}
        />
        <Card.Content>
          <TextInput
            error={isError}
            autoFocus
            placeholder={"Workout name"}
            style={styles.input}
            value={inputData}
            onChangeText={handleChange}
          ></TextInput>
          {isError && (
            <HelperText style={{ color: colors.error }}>
              {"*Please enter a workout name"}
            </HelperText>
          )}
        </Card.Content>
        <Card.Actions style={{ marginTop: 15, justifyContent: "flex-end" }}>
          <Button mode="contained" onPress={handlePress}>
            Create
          </Button>
        </Card.Actions>
      </Card>
    </Modal>
  );
};

export default withTheme(CreateWorkoutModal);
