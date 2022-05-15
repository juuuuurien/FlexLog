import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create_uid } from "../../src/util/create_uid";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { store } from "..";

const initialState = {
  workouts: [],
  loading: true,
  error: "",
};

export const fetchWorkouts = createAsyncThunk("fetchWorkouts", async () => {
  const data = await AsyncStorage.getItem("workouts");
  const workouts = JSON.parse(data);

  return workouts;
});

export const createWorkouts = createAsyncThunk(
  "createWorkout",
  async (newWorkout) => {
    let updatedWorkouts;

    try {
      console.log("attempting to create");
      const workoutsJSON = await AsyncStorage.getItem("workouts");
      const workouts = JSON.parse(workoutsJSON);
      updatedWorkouts = [newWorkout, ...workouts];
      console.log("updated workouts is", updatedWorkouts);
      await AsyncStorage.setItem("workouts", JSON.stringify(updatedWorkouts));

      const currentUser = await AsyncStorage.getItem("workouts");

      console.log(currentUser);
    } catch (e) {
      console.warn(e);
    }

    return updatedWorkouts;
  }
);

const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    createWorkout: (state, action) => {
      state.workouts = [action.payload, ...state.workouts];
    },
    updateWorkout: (state, action) => {
      const { data, workoutIndex } = action.payload;
      state.workouts[workoutIndex] = {
        ...state.workouts[workoutIndex],
        ...data,
      };
    },
    deleteWorkout: (state, action) => {
      const id = action.payload;
      const newWorkouts = state.workouts.filter((item) => item.id !== id);

      state.workouts = newWorkouts;
    },
    createExercise: (state, action) => {
      const { workoutIndex } = action.payload;

      const empty_exercise = {
        exercise_name: "",
        sets: [],
        id: create_uid(),
      };

      state.workouts[workoutIndex].exercises.push({ ...empty_exercise });
    },
    updateExercise: (state, action) => {
      const { workoutIndex, exerciseIndex, data } = action.payload;
      console.log("data is ==================, ", data);
      state.workouts[workoutIndex].exercises[exerciseIndex] = {
        ...state.workouts[workoutIndex].exercises[exerciseIndex],
        ...data,
      };
    },
    deleteExercise: (state, action) => {
      const { id, workoutIndex } = action.payload;

      const oldExercises = state.workouts[workoutIndex].exercises;

      state.workouts[workoutIndex].exercises = oldExercises.filter(
        (exercise) => exercise.id !== id
      );
    },
    createSet: (state, action) => {
      const { workoutIndex, exerciseIndex } = action.payload;
      const empty_set = {
        weight: "",
        reps: "",
        id: create_uid(),
        finished: false,
      };

      state.workouts[workoutIndex].exercises[exerciseIndex].sets.push({
        ...empty_set,
      });
    },
    createSetFromTemplate: (state, action) => {
      const { workoutIndex, exerciseIndex, newSets } = action.payload;

      state.workouts[workoutIndex].exercises[exerciseIndex].sets = newSets;
    },
    updateSet: (state, action) => {
      const { workoutIndex, exerciseIndex, setIndex, data } = action.payload;
      const oldData =
        state.workouts[workoutIndex].exercises[exerciseIndex].sets[setIndex];

      state.workouts[workoutIndex].exercises[exerciseIndex].sets[setIndex] = {
        ...oldData,
        ...data,
      };
    },
    deleteSet: (state, action) => {
      const { setId, exerciseIndex, workoutIndex } = action.payload;

      const newSets = state.workouts[workoutIndex].exercises[
        exerciseIndex
      ].sets.filter((set) => set.id !== setId);

      state.workouts[workoutIndex].exercises[exerciseIndex].sets = newSets;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.workouts = action.payload;
        state.loading = false;
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  createWorkout,
  updateWorkout,
  deleteWorkout,
  createExercise,
  updateExercise,
  deleteExercise,
  createSet,
  createSetFromTemplate,
  updateSet,
  deleteSet,
} = workoutsSlice.actions;
export default workoutsSlice.reducer;
