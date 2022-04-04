import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Portal, Modal, Card, TextInput, Button } from 'react-native-paper';

const ExerciseTemplateModal = ({
  handleAddFromTemplate,
  templateModalVisible,
  setTemplateModalVisible,
}) => {
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleSetsChange = (v) => {
    setSets(v);
  };
  const handleRepsChange = (v) => {
    setReps(v);
  };
  const handleWeightChange = (v) => {
    setWeight(v);
  };


  return (
    <Portal>
      <Modal
      style={{flex:1}}
        visible={templateModalVisible}
        onDismiss={() => setTemplateModalVisible(false)}
        animationPreset="slide"
        contentContainerStyle={styles.modalContainer}>
        <Card style={styles.contentContainer}>
          <Card.Title title={'Custom Template'} style={{ marginBottom: 16 }} />
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                maxLength={2}
                keyboardType="numeric"
                placeholder="sets"
                onChangeText={handleSetsChange}
                value={sets}
                dense
              />
              <Text style={{ fontWeight: 'bold' }}> {'X'} </Text>
              <TextInput
                maxLength={2}
                keyboardType="numeric"
                placeholder="reps"
                onChangeText={handleRepsChange}
                value={reps}
                dense
              />
              <Text style={{ fontWeight: 'bold' }}> {'@'} </Text>
              <TextInput
                style={{ width: 'auto' }}
                maxLength={3}
                keyboardType="numeric"
                placeholder="lbs"
                right={<TextInput.Affix text={' lbs'} />}
                onChangeText={handleWeightChange}
                value={weight}
                dense
              />
            </View>
          </Card.Content>
          <Card.Actions style={{ marginTop: 15, justifyContent: 'flex-end' }}>
            <Button
              mode="contained"
              onPress={() => {
                setTemplateModalVisible(false);
                handleAddFromTemplate(sets, reps, weight)
              }}>
              Create
            </Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
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
