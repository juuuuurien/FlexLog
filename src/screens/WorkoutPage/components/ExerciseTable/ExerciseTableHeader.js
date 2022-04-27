import { StyleSheet, Text } from 'react-native';
import React from 'react';

import { Colors, DataTable } from 'react-native-paper';

const ExerciseTableHeader = ({ labels }) => {
  const { grey400 } = Colors;

  const styles = StyleSheet.create({
    weightUnitLabel: {
      color: grey400,
    },
    row: {
      paddingHorizontal: 30,
    },
    offsetTitle: {
      marginLeft: 10,
      justifyContent: 'space-around',
    },
  });

  return (
    <DataTable.Header style={styles.row}>
      <DataTable.Title>
        <Text style={styles.weightUnitLabel}>{'set'}</Text>
      </DataTable.Title>
      <DataTable.Title style={styles.offsetTitle} numeric>
        <Text style={styles.weightUnitLabel}>{'weight'}</Text>
      </DataTable.Title>

      <DataTable.Title style={styles.offsetTitle} numeric>
        <Text style={styles.weightUnitLabel}>{'reps'}</Text>
      </DataTable.Title>
    </DataTable.Header>
  );
};

ExerciseTableHeader.displayname = 'ExerciseTable.Header';

export default ExerciseTableHeader;
