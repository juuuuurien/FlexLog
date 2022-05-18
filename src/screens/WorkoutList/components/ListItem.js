import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  List,
  Colors,
  Caption,
  Headline,
  Subheading,
} from "react-native-paper";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const ListItem = ({ item, id, navigation, index, handleDelete }) => {
  const { date, exercises } = item;
  const dateInFormat = dayjs(date).format("ddd DD MMM");
  const [day, dayNum] = dateInFormat.split(" ");

  const handleLongPress = () => {
    handleDelete(id, item.name);
  };

  const handlePress = () => {
    navigation.navigate("WorkoutPage", {
      id: id,
      workoutIndex: index,
      workoutData: item,
    });
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
    if (exercises[0] === undefined) return "#1E3742";
    const { exercise_name } = exercises[0];

    //  check if exercises includes certain keywords
    const pushKeywords = ["bench", "press", "push", "tricep", "shoulder"];
    const pullKeywords = ["row", "pull", "deadlift", "curl"];
    const legsKeywords = ["squat", "leg", "hamstring", "romanian"];
    const otherKeywords = ["run", "plank", "ab", "abs"];

    if (pushKeywords.some((e) => exercise_name.toLowerCase().includes(e)))
      return "#C33939";
    if (pullKeywords.some((e) => exercise_name.toLowerCase().includes(e)))
      return "#1D84BD";
    if (legsKeywords.some((e) => exercise_name.toLowerCase().includes(e)))
      return "#3DBF5A";
    if (otherKeywords.some((e) => exercise_name.toLowerCase().includes(e)))
      return "#4B228E";

    return "#1E3742";
  };

  const handleDescription = () => {
    let description = "";

    if (exercises.length > 0) {
      // loop through exercise names & append with comma.
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
      delayLongPress={250}
      activeOpacity={0.75}
      style={[
        styles.container,
        {
          backgroundColor:
            item.cardColor === "" || item.cardColor === "auto"
              ? handleCardColor()
              : item.cardColor,
        },
      ]}
      onLongPress={handleLongPress}
      onPress={handlePress}
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
    backgroundColor: "#16242A",
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
