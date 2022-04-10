import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Portal, Modal, Card, TextInput, Button } from 'react-native-paper';
import { WorkoutDataContext } from '../../../../context/WorkoutDataContext';

const ExerciseTemplateModal = ({
  exerciseName,
  notesModalVisible,
  setNotesModalVisible,
  exerciseIndex,
}) => {
  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);

  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (workoutData.exercises[exerciseIndex].notes)
      setNotes(workoutData.exercises[exerciseIndex].notes);
  }, []);

  const handleSaveNotes = () => {
    if (workoutData.exercises[exerciseIndex].notes === notes) return;
    const newExerciseArray = [...workoutData.exercises];
    newExerciseArray[exerciseIndex].notes = notes;
    setWorkoutData({ ...workoutData, exercises: newExerciseArray });
  };
  const handleChangeText = (v) => {
    setNotes(v);
  };

  return (
    <Portal>
      <Modal
        visible={notesModalVisible}
        onDismiss={() => setNotesModalVisible(false)}
        animationPreset="slide"
        contentContainerStyle={styles.modalContainer}>
        <Card style={styles.contentContainer}>
          <Card.Title
            title={`${exerciseName} Notes:`}
            style={{ marginBottom: 16 }}
          />
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                style={{ flex: 1 }}
                multiline={true}
                numberOfLines={8}
                defaultValue={notes}
                value={notes}
                onChangeText={handleChangeText}
              />
            </View>
          </Card.Content>
          <Card.Actions style={{ marginTop: 15, justifyContent: 'flex-end' }}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => {
                setNotesModalVisible(false);
                handleSaveNotes()
              }}>
              Save
            </Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  button: { marginHorizontal: 5 },
  contentContainer: {
    padding: 10,
    width: '100%',
  },
  modalContainer: {
        justifyContent:'flex-start',
    margin: 25,
    alignItems: 'center',
  },
});

export default ExerciseTemplateModal;
