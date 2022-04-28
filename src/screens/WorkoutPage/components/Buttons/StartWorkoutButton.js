import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button, Colors } from "react-native-paper";
import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";
import { UserDataContext } from "../../../../context/UserDataContext";
import dayjs from "dayjs";

const StartWorkoutButton = ({ id, workoutData, setWorkoutData }) => {
  // this will update WorkoutDataState and append it with an empty exercise

  const { dispatch } = useContext(UserDataContext);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    console.log("started is", workoutData.started);
    // initialize button state depending on store
    if (workoutData.started) setStarted(true);
    if (workoutData.started && workoutData.finished) setFinished(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutData]);

  const handleColor = () => {
    if (started && !finished) return Colors.red600;
    if (started === true && finished === true) return Colors.grey600;
    return Colors.green600;
  };

  const handleButtonText = () => {
    if (started && !finished) return "Finish";
    if (started && finished) return "Finished";
    return "Start";
  };

  const handlePress = () => {
    if (!started) {
      setWorkoutData({
        ...workoutData,
        started: true,
        startTime: dayjs().format(),
      });
      return;
    }

    const getTimeString = (initial_time, end_time) => {
      const hours = dayjs(end_time).diff(initial_time, "hours");
      const minutes = dayjs(end_time).diff(initial_time, "minutes") % 60;
      const seconds =
        dayjs(end_time).diff(initial_time, "second") -
        dayjs(end_time).diff(initial_time, "minutes") * 60;

      const toDoubleDigits = (num) => {
        return num >= 10 ? num : "0" + num;
      };

      return `${toDoubleDigits(hours)}:${toDoubleDigits(
        minutes
      )}:${toDoubleDigits(seconds)}`;
    };

    if (started && !finished) {
      Alert.alert("Finish Workout", `Are you finished with this workout?`, [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "Finish this workout.",
          onPress: () => {
            setWorkoutData({
              ...workoutData,
              finished: true,
              finishTime: getTimeString(
                workoutData.startTime,
                dayjs().format()
              ),
            });
          },
        },
      ]);

      return;
    }
  };

  const handleLongPress = () => {
    if (started && !finished) {
      Alert.alert(
        "Restart",
        `Do you want to cancel this workout and set it as not started?`,
        [
          {
            text: "Cancel",
            onPress: () => {
              return;
            },
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              setStarted(false);
              setFinished(false);
              setWorkoutData({ ...workoutData, started: false });
            },
          },
        ]
      );
    }

    return;
  };

  return (
    <Button
      color={handleColor()}
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      {handleButtonText()}
    </Button>
  );
};

export default StartWorkoutButton;
