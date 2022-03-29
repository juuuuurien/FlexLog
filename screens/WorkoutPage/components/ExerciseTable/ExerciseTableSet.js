import React from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";

const ExerciseTableSet = ({ set, weight, reps }) => {
  return (
    <DataTable.Row style={styles.row}>
      <DataTable.Cell>{set}</DataTable.Cell>
      <DataTable.Cell numeric>{weight}</DataTable.Cell>
      <DataTable.Cell numeric>{reps}</DataTable.Cell>
    </DataTable.Row>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 30,
  },
});

export default ExerciseTableSet;
