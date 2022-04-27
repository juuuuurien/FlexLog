import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Card,
  TextInput,
  Title,
  withTheme,
  Paragraph,
  Button,
} from "react-native-paper";

const WelcomeScreen = ({ navigation }) => {
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Card
        style={{
          backgroundColor: "transparent",
          elevation: 0,
          borderRadius: 10,
        }}
      >
        <Card.Title title="Welcome to Julien's Gym" />
        <Card.Actions style={{ marginTop: 15, justifyContent: "flex-end" }}>
          <Button onPress={handleRegister}>Register</Button>
          <Button onPress={handleLogin} mode="contained">
            Login
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    margin: 20,
    justifyContent: "center",
  },
});
