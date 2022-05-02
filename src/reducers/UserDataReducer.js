// let userData = {
//   workouts: {
//     id: {
//       id: string,
//       date: string,
//       exercises: [
//         {
//           name: string,
//           exerciseData: [
//             {
//               weight: number,
//               reps: number,
//               done: boolean,
//             },
//           ],
//         },
//       ],
//     },
//   },

import { omit } from "../util/omit";
import { empty_set } from "../static/empty_set";

export const userDataReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_STATE": {
      return { ...action.payload };
    }
    case "CREATE_WORKOUT": {
      return {
        ...state,
        workouts: [action.payload, ...state.workouts],
      };
    }
    case "UPDATE_WORKOUT": {
      const newWorkouts = [...state.workouts];
      newWorkouts[action.payload.index] = action.payload.data;
      return {
        ...state,
        workouts: [...newWorkouts],
      };
    }
    case "UPDATE_WORKOUT_STATUS": {
      if (Object.keys(action.payload).includes("started"))
        return {
          ...state,
          workouts: {
            ...state.workouts,
            [action.payload.id]: {
              ...state.workouts[action.payload.id],
              started: action.payload.started,
            },
          },
        };

      if (Object.keys(action.payload).includes("finished"))
        return {
          ...state,
          workouts: {
            ...state.workouts,
            [action.payload.id]: {
              ...state.workouts[action.payload.id],
              finished: action.payload.finished,
            },
          },
        };

      return { ...state };
    }
    case "DELETE_WORKOUT": {
      const id = action.payload;
      const newWorkouts = [...state.workouts].filter((item) => id !== item.id);
      return {
        ...state,
        workouts: newWorkouts,
      };
    }
    case "CREATE_EXERCISE": {
      const { data, id } = action.payload;

      return {
        ...state,
        workouts: {
          ...state.workouts,
          [id]: { ...state.workouts[id], exercises: data },
        },
      };
    }
    case "UPDATE_EXERCISE": {
      return {
        ...state,
        workouts: {
          ...state.workouts,
          [action.payload.id]: { ...action.payload.data },
        },
      };
    }
    case "DELETE_EXERCISE": {
      const { id, exerciseIndex } = action.payload;

      // filter array to accept all elements that do no match given id
      const newExerciseArray = state.workouts[id].exercises.filter(
        (e, i) => i !== exerciseIndex
      );
      return {
        ...state,
        workouts: {
          ...state.workouts,
          [id]: { ...state.workouts[id], exercises: newExerciseArray },
        },
      };
    }
    case "CREATE_SET": {
      // data should be the exercise object with new
      const { id, exerciseIndex, data } = action.payload;

      // const newExerciseArray = [...state.workouts[id].exercises];
      // newExerciseArray[exerciseIndex] = {
      //   ...newExerciseArray[exerciseIndex],
      //   sets: [...newExerciseArray[exerciseIndex], { ...empty_set }],
      // };

      return {
        ...state,
        workouts: {
          ...state.workouts,
          [id]: { ...state.workouts[id], exercises: data },
        },
      };
    }
    case "DELETE_SET": {
      const { id, exerciseIndex, setIndex } = action.payload;
      const setArray = state.workouts[id].exercises[exerciseIndex].sets;
      setArray.splice(setIndex, 1);
      const newExerciseArray = [...state.workouts[id].exercises];
      newExerciseArray[exerciseIndex].sets = setArray;

      return {
        ...state,
        workouts: {
          ...state.workouts,
          [id]: { ...state.workouts[id], exercises: newExerciseArray },
        },
      };
    }
    case "CLEAR_DATA": {
      return { ...action.payload };
    }
    default:
      return state;
  }
};
