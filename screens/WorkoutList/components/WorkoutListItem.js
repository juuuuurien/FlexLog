import React, { useContext, useState } from "react";
import { Text, HStack, Pressable, Box } from "native-base";

import PressableComponent from "../../../components/global/PressableComponent";
import { Alert } from "react-native";
import { UserDataContext } from "../../../context/UserDataContext";
import { omit } from "../../../util/omit";

const WorkoutListItem = ({ item, id, navigation }) => {
  const { dispatch } = useContext(UserDataContext);
  const [longPressed, setLongPressed] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleLongPress = () => {
    Alert.alert(
      "Delete this workout?",
      `Do you want to delete "${item.name}" ?`,
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            dispatch({ type: "DELETE_WORKOUT", payload: id });
          },
        },
      ]
    );
  };

  return (
    <Pressable
      borderWidth="1"
      _dark={{
        backgroundColor: pressed ? "blueGray.500" : "blueGray.700",
        borderColor: "blueGray.700",
      }}
      borderRadius={5}
      borderRightRadius={longPressed ? 0 : 5}
      px="5"
      py="2"
      my="1.5"
      onPress={() => {
        navigation.navigate("WorkoutPage", { id: id });
        setPressed(true);
      }}
      onLongPress={handleLongPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <HStack space={3} alignItems="center" justifyContent="space-around">
        <Text bold isTruncated fontSize="md">
          {item.name}
        </Text>
        <Text italic fontSize="xs" color="info.300">
          {item.date}
        </Text>
      </HStack>
    </Pressable>
  );
};

export default WorkoutListItem;
