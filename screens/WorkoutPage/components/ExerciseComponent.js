import React, { useState, useContext } from "react";
import { Pressable } from "react-native";
import { Box, Text, HStack, VStack, Input } from "native-base";

import { WorkoutDataContext } from "../../../context/WorkoutDataContext";

import SetComponent from "./SetComponent";
import PressableComponent from "../../../components/global/PressableComponent";

const ExerciseComponent = ({ data, index }) => {
  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);
  const [name, setName] = useState(data.exercise_name);

  const handleNameChange = (str) => {
    setName(str);
  };

  const handleBlur = () => {
    if (workoutData.exercises[index].exercise_name !== name) {
      let newExercises = workoutData.exercises;
      newExercises[index].exercise_name = name;
      setWorkoutData({ ...workoutData, exercises: [...newExercises] });
    }
  };

  return (
    <Pressable
      onLongPress={() => {
        console.log("this is a long press");
      }}
    >
      <Box
        mt={5}
        borderRadius={5}
        py={3}
        minHeight={100}
        _dark={{ bg: "blueGray.800" }}
      >
        <VStack px={3} space={3}>
          <Input
            mx={2}
            py={1}
            padding={0}
            variant="underlined"
            fontWeight={"semibold"}
            fontSize="lg"
            size="md"
            placeholder="Exercise Name"
            value={name}
            onChangeText={handleNameChange}
            onBlur={handleBlur}
            onEndEditing={handleBlur}
          />

          <VStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Box alignItems="center" flex={1} justifyContent="center">
                <Text fontSize="sm" fontWeight="semibold">
                  {"set"}
                </Text>
              </Box>
              <Box alignItems="center" flex={2} justifyContent="center">
                <Text fontSize="sm" fontWeight="semibold">
                  {"weight"}
                </Text>
              </Box>
              <Box alignItems="center" flex={2} justifyContent="center">
                <Text fontSize="sm" fontWeight="semibold">
                  {"reps"}
                </Text>
              </Box>
            </HStack>
            {data.sets &&
              data.sets.map((data, i) => {
                return (
                  <SetComponent
                    exerciseIndex={index}
                    index={i}
                    count={i + 1}
                    setData={data}
                  />
                );
              })}
          </VStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default ExerciseComponent;
