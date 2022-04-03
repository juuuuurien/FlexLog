import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Portal, Modal, Card, TextInput, Button } from "react-native-paper";

const ExerciseTemplateModal = ({
  templateModalVisible,
  setTemplateModalVisible,
}) => {
  return (
    <Portal>
      <Modal
        visible={templateModalVisible}
        onDismiss={() => setTemplateModalVisible(false)}
        animationPreset="slide"
        contentContainerStyle={styles.modalContainer}
      >
        <Card style={styles.contentContainer}>
          <Card.Title title={"Custom Template"} style={{ marginBottom: 16 }} />
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                maxLength={2}
                keyboardType="numeric"
                placeholder="sets"
                dense
              />
              <Text style={{ fontWeight: "bold" }}> X </Text>
              <TextInput
                maxLength={2}
                keyboardType="numeric"
                placeholder="reps"
                dense
              />
              <Text style={{ fontWeight: "bold" }}> @ </Text>
              <TextInput
                style={{ width: "auto" }}
                maxLength={3}
                keyboardType="numeric"
                placeholder="lbs"
                right={<TextInput.Affix text={" lbs"} />}
                dense
              />
            </View>
          </Card.Content>
          <Card.Actions style={{ marginTop: 15, justifyContent: "flex-end" }}>
            <Button
              mode="contained"
              onPress={() => setTemplateModalVisible(false)}
            >
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
    width: "100%",
  },
  modalContainer: {
    margin: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExerciseTemplateModal;
