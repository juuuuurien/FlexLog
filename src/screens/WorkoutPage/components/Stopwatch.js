import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import dayjs from "dayjs";
import Animated, { FadeInUp, Layout } from "react-native-reanimated";

const Stopwatch = ({
  startTime,
  finishTime,
  started,
  finished,
  handleResetTimer,
}) => {
  console.log(startTime);
  const toDoubleDigits = (num) => {
    return num >= 10 ? num : "0" + num;
  };

  const getTimeString = (initial_time) => {
    const hours = dayjs().diff(initial_time, "hours");
    const minutes = dayjs().diff(initial_time, "minutes") % 60;
    const seconds =
      dayjs().diff(initial_time, "second") -
      dayjs().diff(initial_time, "minutes") * 60;

    return `${toDoubleDigits(hours)}:${toDoubleDigits(
      minutes
    )}:${toDoubleDigits(seconds)}`;
  };

  // if finished, set time to the finish time from state.
  const [time, setTime] = useState(
    !finished ? getTimeString(startTime) : finishTime
  );

  const intervalRef = useRef(null);
  const timeRef = useRef(time);

  //  if the workout has started, save a time snapshot when button is clicked
  //  on mount, if the workout is started, continue the timer
  //  by calculating the difference between the start time snapshot, and current time
  //  on mount.

  const start = () => {
    if (started) {
      console.log("settingn interval");
      intervalRef.current = setInterval(() => {
        setTime(() => {
          return getTimeString(startTime);
        });
      }, 1000);
    }
  };

  const stop = () => {
    console.log("clearing interval");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    if (started && !finished) {
      start();
    }

    if (finished) stop();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [started, finished, startTime]);

  return (
    <TouchableOpacity
      disabled={finished}
      onLongPress={() => {
        Alert.alert(
          "Reset timer?",
          "Do you want to reset the timer?",
          [
            {
              text: "Cancel",
              style: "destructive",

              onPress: () => {
                return;
              },
            },
            {
              text: "Reset",
              style: "cancel",
              onPress: () => {
                handleResetTimer();
              },
            },
          ],
          { cancelable: true }
        );
      }}
    >
      <Animated.View
        layout={Layout}
        entering={FadeInUp}
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 36,
        }}
      >
        <Text style={styles.time}>{time}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  time: { color: "#FFF" },
});
