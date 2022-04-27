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
import { signInWithFirebase } from "../../api/firebase";

const LoginScreen = () => {
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
      await signInWithFirebase(email, password);
    } catch (err) {
      setIsError(`${err.message}`);
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
        <Card.Title title="Log in" />
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
            Login
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

export default withTheme(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    margin: 20,
    justifyContent: "center",
  },
});
