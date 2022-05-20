import modalSlice from "../slices/modalSlice";
import workoutsSlice from "../slices/workoutsSlice";

export const rootReducer = {
  workouts: workoutsSlice,
  modal: modalSlice,
};
