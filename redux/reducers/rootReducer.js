import settingsSlice from "../slices/settingsSlice";
import workoutsSlice from "../slices/workoutsSlice";

export const rootReducer = {
  workouts: workoutsSlice,
  settings: settingsSlice
};
