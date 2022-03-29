import React, { useState, useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Box, Text, HStack, VStack, Input } from "native-base";
import { DataTable, TextInput, Colors, useTheme } from "react-native-paper";
import { WorkoutDataContext } from "../../../context/WorkoutDataContext";
import SetComponent from "./SetComponent";
import PressableComponent from "../../../components/global/PressableComponent";
import ExerciseTable from "./ExerciseTable/ExerciseTable";

const ExerciseComponent = ({ data, index }) => {
  const { colors } = useTheme();
  const { blueGrey200, grey400 } = Colors;
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

  // return (
  //   <Pressable
  //     onLongPress={() => {
  //       console.log("this is a long press");
  //     }}
  //   >
  //     <Box
  //       mt={5}
  //       borderRadius={5}
  //       py={3}
  //       minHeight={100}
  //       _dark={{ bg: "blueGray.800" }}
  //     >
  //       <VStack px={3} space={3}>
  //         <Input
  //           mx={2}
  //           py={1}
  //           padding={0}
  //           variant="underlined"
  //           fontWeight={"semibold"}
  //           fontSize="lg"
  //           size="md"
  //           placeholder="Exercise Name"
  //           value={name}
  //           onChangeText={handleNameChange}
  //           onBlur={handleBlur}
  //           onEndEditing={handleBlur}
  //         />

  //         <VStack>
  //           <HStack alignItems="center" justifyContent="space-between">
  //             <Box alignItems="center" flex={1} justifyContent="center">
  //               <Text fontSize="sm" fontWeight="semibold">
  //                 {"set"}
  //               </Text>
  //             </Box>
  //             <Box alignItems="center" flex={2} justifyContent="center">
  //               <Text fontSize="sm" fontWeight="semibold">
  //                 {"weight"}
  //               </Text>
  //             </Box>
  //             <Box alignItems="center" flex={2} justifyContent="center">
  //               <Text fontSize="sm" fontWeight="semibold">
  //                 {"reps"}
  //               </Text>
  //             </Box>
  //           </HStack>
  //           {data.sets &&
  //             data.sets.map((data, i) => {
  //               return (
  //                 <SetComponent
  //                   exerciseIndex={index}
  //                   index={i}
  //                   count={i + 1}
  //                   setData={data}
  //                 />
  //               );
  //             })}
  //         </VStack>
  //       </VStack>
  //     </Box>
  //   </Pressable>
  // );

  const fakeData = {
    name: "Bench Press",
    sets: [
      {
        weight: 255,
        reps: 8,
      },
    ],
  };

  const styles = StyleSheet.create({
    textInput: {
      padding: 5,
      width: "100%",
      fontWeight: "bold",
    },
    exercise: {
      borderRadius: 5,
      backgroundColor: colors.background,
    },
  });

  return (
    <View style={styles.exercise}>
      <TextInput
        placeholder="i.e Bench Press"
        label={"Exercise Name"}
        style={styles.textInput}
      />

      <ExerciseTable>
        <ExerciseTable.Header labels={["set", "weight", "reps"]} />
        {fakeData.sets &&
          fakeData.sets.map((data, i) => {
            return (
              <ExerciseTable.Set
                index={i}
                set={i + 1}
                weight={data.weight}
                reps={data.reps}
              />
            );
          })}
      </ExerciseTable>
    </View>
  );
};

export default ExerciseComponent;
