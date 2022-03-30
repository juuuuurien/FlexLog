import React, { useState, useContext, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Box, Text, HStack, VStack, Input } from 'native-base';
import {
  DataTable,
  TextInput,
  Colors,
  IconButton,
  Button,
  Menu,
  Divider,
  useTheme,
} from 'react-native-paper';
import { WorkoutDataContext } from '../../../context/WorkoutDataContext';
import PressableComponent from '../../../components/global/PressableComponent';
import ExerciseTable from './ExerciseTable/ExerciseTable';
import { empty_set } from '../../../static/empty_set';

const ExerciseComponent = ({ exerciseData, exerciseIndex }) => {
  const { colors } = useTheme();
  const { blueGrey200, grey400 } = Colors;
  const { workoutData, setWorkoutData } = useContext(WorkoutDataContext);
  const [name, setName] = useState();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setName(exerciseData.exercise_name)
  }, [workoutData])


  const handleNameChange = (str) => {
    setName(str);
  };

  const handleBlur = () => {
    if (workoutData.exercises[exerciseIndex].exercise_name !== name) {
      let newExercises = workoutData.exercises;
      newExercises[exerciseIndex].exercise_name = name;
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

  const styles = StyleSheet.create({
    textInputContainer: {
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: grey400,
      justifyContent: 'space-between',
      textAlign: 'center',
      alignItems: 'center',
    },
    textInput: {
      flex:1,
      color: colors.primary,
      backgroundColor: 'transparent',
      height: 54,
      paddingHorizontal: 25,
      fontSize: 20,
    },
    exercise: {
      borderRadius: 5,
      backgroundColor: colors.background,
      marginBottom: 15,
    },
  });

  const handleAddSet = () => {
    // append this exercises set array with a new empty set
    const newExercises = workoutData.exercises;
    const newSetArray = [...exerciseData.sets, { ...empty_set }];
    newExercises[exerciseIndex].sets = newSetArray;
    setWorkoutData({ ...workoutData, exercises: newExercises });
  };

  return (
    <View style={styles.exercise}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="'Workout Name'"
          style={styles.textInput}
          value={name}
          underlineColor="transparent"
          onChangeText={handleNameChange}
          onBlur={handleBlur}
          onEndEditing={handleBlur}
        />
        <Menu
          visible={visible}
          onDismiss={()=>setVisible(false)}
          anchor={<IconButton
          icon="dots-vertical"
          color={colors.primary}
          size={28}
          onPress={() => setVisible(true)}
        />}>
          <Menu.Item onPress={() => {
            setVisible(false)
           const oldExerciseArray = [...workoutData.exercises];
           oldExerciseArray.splice(exerciseIndex, 1);
           setWorkoutData({...workoutData, exercises: oldExerciseArray})
          }} title="Remove Exercise" icon={'trash-can-outline'}  />
        </Menu>
        
        
      </View>

      <ExerciseTable>
        <ExerciseTable.Header labels={['set', 'weight', 'reps']} />
        {exerciseData.sets &&
          exerciseData.sets.map((data, i) => {
            return (
              <ExerciseTable.Set
                setIndex={i}
                exerciseIndex={exerciseIndex}
                set_count={i + 1}
                setData={data}
              />
            );
          })}
      </ExerciseTable>
      <Button onPress={handleAddSet}>Add Set</Button>
    </View>
  );
};

export default ExerciseComponent;
