import React from 'react'
import { DataTable } from "react-native-paper";
import ExerciseTableHeader from "./ExerciseTableHeader";
import ExerciseTableSet from "./ExerciseTableSet";

const ExerciseTable = ({ children, style }) => (
  <DataTable style={style}>{children}</DataTable>
);

ExerciseTable.Header = ExerciseTableHeader;
ExerciseTable.Set = ExerciseTableSet;

export default ExerciseTable;
