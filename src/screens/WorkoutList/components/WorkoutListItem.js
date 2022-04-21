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

const WorkoutListItem = ({ item, id, navigation }) => {
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

  const handleColor = () => {
    if (item.started && !item.finished) return Colors.green600;
    if (item.started === true && item.finished === true) return Colors.grey600;
    return Colors.grey600;
  };

  const handleDescription = () => {
    let description = "";

    if (exercises.length > 0) {
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

  const styles = StyleSheet.create({
    container: {
      margin: 4,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.grey900,
      borderRadius: 10,
    },
    listItem: {
      flex: 1,
      height: "100%",
      elevation: 1,
      backgroundColor: Colors.grey800,
      borderRadius: 10,
    },
    caption: {
      color: handleColor(),
      padding: 10,
    },
    titleStyle: { fontWeight: "bold", fontSize: 26 },
    subheading: { margin: 0, fontSize: 14 },
    dateTab: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      textAlignVertical: "center",
      width: "20%",
      padding: 6,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onLongPress={handleLongPress}
      onPress={() => {
        navigation.navigate("WorkoutPage", { id: id });
      }}
    >
      <View style={styles.dateTab}>
        <Subheading style={[styles.subheading]}>{day}</Subheading>
        <Headline style={[styles.titleStyle]}>{dayNum}</Headline>
      </View>
      <List.Item
        style={styles.listItem}
        titleStyle={styles.titleStyle}
        title={item.name}
        description={handleDescription()}
        right={() => (
          <Caption style={styles.caption}>{handleCaption()}</Caption>
        )}
      />
    </TouchableOpacity>
  );
};

export default WorkoutListItem;
