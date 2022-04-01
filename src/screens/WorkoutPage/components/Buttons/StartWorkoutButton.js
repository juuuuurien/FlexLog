import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Button, Colors } from "react-native-paper";
import { WorkoutDataContext } from "../../../../context/WorkoutDataContext";
import { UserDataContext } from "../../../../context/UserDataContext";

const StartWorkoutButton = () => {
  // this will update WorkoutDataState and append it with an empty exercise

  const { id } = useContext(WorkoutDataContext);
  const { state, dispatch } = useContext(UserDataContext);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // initialize button state depending on store
    if (state.workouts[id].started) setStarted(true);
    if (state.workouts[id].started && state.workouts[id].finished)
      setFinished(true);
  }, [state.workouts[id]]);

  const handleColor = () => {
    if (started && !finished) return Colors.red600;
    if (started === true && finished === true) return Colors.grey600;
    return Colors.green600;
  };

  const handleButtonText = () => {
    if (started && !finished) return "Finish Workout";
    if (started && finished) return "Finished";
    return "Start Workout";
  };

  const handlePress = () => {
    if (!started) {
      dispatch({
        type: "UPDATE_WORKOUT_STATUS",
        payload: { id: id, started: true },
      });
      return;
    }

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
          text: "Yes, finish this workout.",
          onPress: () => {
            dispatch({
              type: "UPDATE_WORKOUT_STATUS",
              payload: { id: id, finished: true },
            });
          },
        },
      ]);

      return;
    }
  };

  return (
    <Button
      contentStyle={{ height: 64 }}
      mode="contained"
      color={handleColor()}
      onPress={handlePress}
    >
      {handleButtonText()}
    </Button>
  );
};

export default StartWorkoutButton;
