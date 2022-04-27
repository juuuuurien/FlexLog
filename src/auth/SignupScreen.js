import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Card,
  TextInput,
  Title,
  withTheme,
  Paragraph,
  Button,
  HelperText,
  useTheme,
} from "react-native-paper";
import { auth, registerWithFirebase } from "../../api/firebase";

const SignupScreen = () => {
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeEmail = (v) => setEmail(v);
  const handleChangePassword = (v) => setPassword(v);

  const handleSubmit = async () => {
    //   due error checks here
    if (email === "" || password === "") {
      setIsError("Please complete all fields.");
      return;
    }

    try {
      await registerWithFirebase(email, password);
    } catch (err) {
      console.log(err.message);
      if (err.message === "Firebase: Error (auth/invalid-email).")
        setIsError("Please enter a valid email.");
      if (err.message === "Firebase: Error (auth/email-already-in-use).")
        setIsError("Please enter a valid email.");
    }
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
        <Card.Title title="Sign up" />
        <Card.Content>
          <TextInput
            onChangeText={handleChangeEmail}
            label={"Email"}
            mode={"outlined"}
            outlineColor="transparent"
          />
          <TextInput
            onChangeText={handleChangePassword}
            label={"Password"}
            secureTextEntry
            mode={"outlined"}
            outlineColor="transparent"
          />
        </Card.Content>
        <Card.Actions style={{ marginTop: 15, justifyContent: "flex-end" }}>
          <Button>Forgot password</Button>
          <Button mode="contained" onPress={handleSubmit}>
            Signup
          </Button>
        </Card.Actions>
        {isError !== false && (
          <HelperText style={{ color: colors.error, alignSelf: "flex-end" }}>
            {`*${isError}`}
          </HelperText>
        )}
      </Card>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    margin: 20,
    justifyContent: "center",
  },
});
