import React, {
  useState,
  useContext,
  useEffect,
  createContext,
  useRef,
} from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { UserDataContext } from "../../context/UserDataContext";
import { WorkoutDataContextProvider } from "../../context/WorkoutDataContext";
import ExerciseComponent from "./components/ExerciseComponent";
import AddExerciseButton from "./components/Buttons/AddExerciseButton";
import StartWorkoutButton from "./components/Buttons/StartWorkoutButton";
import { Portal } from "react-native-paper";
// loop through workouts and render exercise containers

const WorkoutPage = ({ navigation, route }) => {
  const { state, dispatch, setLoading, storeData } =
    useContext(UserDataContext);
  const id = route.params.id;
  const [workoutData, setWorkoutData] = useState(null);

  useEffect(() => {
    setWorkoutData(state.workouts[id]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.workouts[id]]);

  useEffect(() => {
    // check if this particular exercise has any added
    // and initialize workout page with data
    if (workoutData === null) return;
    navigation.setOptions({ title: workoutData.name });
    if (state.workouts[id].exercises !== workoutData.exercises)
      dispatch({
        type: "UPDATE_EXERCISE",
        payload: { id: id, data: workoutData },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutData]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <Portal.Host>
      <WorkoutDataContextProvider value={{ workoutData, setWorkoutData, id }}>
        <View style={styles.container}>
          {workoutData && (
            <FlatList
              removeClippedSubviews={false}
              data={workoutData.exercises}
              keyExtractor={(_, index) => index}
              ListFooterComponent={() =>
                !workoutData.finished ? <AddExerciseButton /> : null
              }
              renderItem={({ item, index }) => {
                return (
                  <ExerciseComponent
                    key={index}
                    exerciseData={item}
                    exerciseIndex={index}
                  />
                );
              }}
            />
          )}
          <StartWorkoutButton />
        </View>
      </WorkoutDataContextProvider>
    </Portal.Host>
  );
};

export default WorkoutPage;
