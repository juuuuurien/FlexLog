import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import {
  List,
  Colors,
  Caption,
  Text,
  Subheading,
  useTheme,
  TouchableRipple,
} from "react-native-paper";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const ListItem = ({ item, id, navigation, index, handleDelete }) => {
  const { colors, dark } = useTheme();

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
    if (exercises[0] === undefined) return colors.cardGray;
    const { exercise_name } = exercises[0];

    //  check if exercises includes certain keywords
    const pushKeywords = ["bench", "press", "push", "tricep", "shoulder"];
    const pullKeywords = ["row", "pull", "deadlift", "curl"];
    const legsKeywords = ["squat", "leg", "hamstring", "romanian"];
    const otherKeywords = ["run", "plank", "ab", "abs"];

    if (pushKeywords.some((e) => exercise_name.toLowerCase().includes(e)))
      return colors.cardRed;
    if (pullKeywords.some((e) => exercise_name.toLowerCase().includes(e)))
      return colors.cardBlue;
    if (legsKeywords.some((e) => exercise_name.toLowerCase().includes(e)))
      return colors.cardGreen;
    if (otherKeywords.some((e) => exercise_name.toLowerCase().includes(e)))
      return colors.cardPurple;

    return colors.cardGray;
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
    <TouchableRipple
      borderless={true}
      delayLongPress={250}
      onLongPress={handleLongPress}
      onPress={handlePress}
      color={"rgb(0,0,0, 0.5)"}
      style={[
        styles.container,
        {
          backgroundColor:
            item.cardColor === "" || item.cardColor === "auto"
              ? handleCardColor()
              : item.cardColor,
        },
      ]}
    >
      <View style={{ flexDirection: "row", height: 100, flex: 1 }}>
        <View style={[styles.dateTab]}>
          <Text
            style={[styles.dateDay, { color: dark ? colors.text : "#FFF" }]}
          >
            {day}
          </Text>
          <Text
            style={[styles.dateMonth, { color: dark ? colors.text : "#FFF" }]}
          >
            {dayNum}
          </Text>
        </View>
        <List.Item
          style={[styles.rightContainer, { backgroundColor: colors.surface }]}
          titleStyle={styles.titleStyle}
          title={item.name}
          description={handleDescription()}
          right={() => (
            <Caption style={[styles.caption, { color: handleStatusColor() }]}>
              {handleCaption()}
            </Caption>
          )}
        />
      </View>
    </TouchableRipple>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    margin: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    elevation: 4,
  },
  rightContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    borderRadius: 14,
  },
  caption: {
    padding: 10,
  },
  titleStyle: { fontWeight: "bold", fontSize: 22 },
  dateDay: { margin: 0, fontSize: 16, fontWeight: "bold" },
  dateMonth: {
    lineHeight: 42,
    fontSize: 32,
    fontWeight: "bold",
  },
  dateTab: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    width: "20%",
    padding: 6,
  },
});
