import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Headline } from "react-native-paper";

import { WorkoutDataContext } from "../../../context/WorkoutDataContext";

const SetsByRepsComponent = ({ exerciseIndex, exerciseData }) => {
  // this will update WorkoutDataState and append it with an empty exercise
  // maybe just set up the reducer to handle state changes globally rather than
  // using local states

  const getSets = () => exerciseData.sets.length;

  const getReps = () => {
    if (exerciseData.sets.length <= 1) return "0";
    // check each rep element.
    // if all the same, return that number
    // else return 'mixed'

    const isSame = exerciseData.sets.every(
      (set) => set.reps === exerciseData.sets[0].reps
    );

    return isSame
      ? exerciseData.sets[0].reps === ""
        ? "0"
        : exerciseData.sets[0].reps
      : "mixed";
  };

  return (
    <Headline style={styles.headline}>
      {`${getSets()} sets x ${getReps()} reps`}
    </Headline>
  );
};

const styles = StyleSheet.create({
  headline: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    fontSize: 18,
  },
});

export default SetsByRepsComponent;
