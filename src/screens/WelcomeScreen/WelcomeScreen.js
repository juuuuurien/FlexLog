import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { Card, Button } from "react-native-paper";
import Animated, { FadeInDown } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setFirstStart } from "../../../redux/slices/settingsSlice";

const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const images = [
    require("../../../assets/gym_background_1.png"),
    require("../../../assets/gym_background_2.png"),
  ];

  const handleGetImage = () => {
    const i = Math.floor(Math.random() * images.length);
    return images[i];
  };

  // when leaving, set firstStart to false.

  const handleLeaveWelcomeScreen = async () => {
    try {
      console.log("Attempting to save data... ");
      await AsyncStorage.mergeItem(
        "userSettings",
        JSON.stringify({ firstStart: false })
      ).then(() => {
        console.log("... SAVED!");
      });
    } catch (err) {
      console.warn(err);
    } finally {
      dispatch(setFirstStart(false));
      navigation.navigate("NewWorkoutList");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.backgroundImage} source={handleGetImage()}>
        <Animated.View entering={FadeInDown.delay(250).duration(800)}>
          <Card
            style={{
              backgroundColor: "transparent",
              elevation: 0,
              borderRadius: 10,
            }}
          >
            <Card.Title
              titleStyle={{ color: "#fff" }}
              title="Welcome to FlexLog"
            />
            <Card.Actions style={{ marginTop: 15, justifyContent: "flex-end" }}>
              <Animated.View entering={FadeInDown.delay(750).duration(800)}>
                <Button onPress={handleLeaveWelcomeScreen} mode="contained">
                  {"Get Started"}
                </Button>
              </Animated.View>
            </Card.Actions>
          </Card>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
