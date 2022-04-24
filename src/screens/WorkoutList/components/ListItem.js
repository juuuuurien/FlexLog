import React, { useContext, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  View,
  Text,
} from "react-native";
import {
  List,
  Colors,
  Caption,
  Headline,
  Subheading,
  useTheme,
} from "react-native-paper";
import { UserDataContext } from "../../../context/UserDataContext";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const ListItem = ({ item, id, navigation }) => {
  console.log(item);
  const { date, exercises } = item;
  const dateInFormat = dayjs(date).format("ddd DD MMM");
  const [day, dayNum] = dateInFormat.split(" ");

  const { dispatch } = useContext(UserDataContext);
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

  const handleCaption = () => {
    if (item.finished) return "Finished";
    if (item.started && !item.finished) return "In Progress";
    return "Not Started";
  };

  const handleStatusColor = () => {
    if (item.started && !item.finished) return Colors.green600;
    if (item.started === true && item.finished === true) return Colors.grey600;
    return Colors.grey600;
  };

  const handleCardColor = () => {
    // if (exercises[0] === undefined) return "#162227";
    // const { exercise_name } = exercises[0];

    //  check if exercises includes certain keywords
    const pushKeywords = ["bench", "press", "push", "tricep", "shoulder"];
    const pullKeywords = ["row", "pull", "deadlift", "curl"];
    const legsKeywords = ["squat", "leg", "hamstring", "romanian"];
    const otherKeywords = ["run", "plank", "ab", "abs"];

    if (pushKeywords.some((e) => item.name.toLowerCase().includes(e)))
      return "#B63030";
    if (pullKeywords.some((e) => item.name.toLowerCase().includes(e)))
      return "#1575AB";
    if (legsKeywords.some((e) => item.name.toLowerCase().includes(e)))
      return "#339A4A";
    if (otherKeywords.some((e) => item.name.toLowerCase().includes(e)))
      return "#5828A7";

    return "#162227";
  };

  const handleDescription = () => {
    let description = "";

    if (exercises.length > 0) {
      // loop through exercise names & append.
      exercises.forEach(({ exercise_name }, i) => {
        if (i !== exercises.length - 1) {
          description += exercise_name + ", ";
        } else {
          description += exercise_name;
        }
      });
      // concat with trailing dots if the character length hits above 45
      if (description.length >= 45)
        return description.substring(0, 45).concat("...");
      return description;
    }

    return "Empty";
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, { backgroundColor: handleCardColor() }]}
      onLongPress={handleLongPress}
      onPress={() => {
        navigation.navigate("WorkoutPage", { id: id });
      }}
    >
      <View style={[styles.dateTab]}>
        <Subheading style={[styles.subheading]}>{day}</Subheading>
        <Headline style={[styles.dateMonth]}>{dayNum}</Headline>
      </View>
      <List.Item
        style={styles.listItem}
        titleStyle={styles.titleStyle}
        title={item.name}
        description={handleDescription()}
        right={() => (
          <Caption style={[styles.caption, { color: handleStatusColor() }]}>
            {handleCaption()}
          </Caption>
        )}
      />
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    margin: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#162227",
    borderRadius: 12,
  },
  listItem: {
    flex: 1,
    height: "100%",
    elevation: 1,
    backgroundColor: "#425158",
    borderRadius: 12,
  },
  caption: {
    padding: 10,
  },
  titleStyle: { fontWeight: "bold", fontSize: 20 },
  subheading: { margin: 0, fontSize: 14 },
  dateMonth: { fontSize: 28, fontWeight: "bold" },
  dateTab: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    width: "20%",
    padding: 6,
  },
});
