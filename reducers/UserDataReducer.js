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

export const userDataReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_STATE": {
      return { ...action.payload };
    }
    case "CREATE_WORKOUT": {
      return {
        ...state,
        workouts: {
          ...state.workouts,
          [action.payload.id]: action.payload.data,
        },
      };
    }
    case "DELETE_WORKOUT": {
      const newWorkoutsObj = omit({ ...state.workouts }, action.payload);
      return {
        ...state,
        workouts: newWorkoutsObj,
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
    case "CLEAR_DATA": {
      return { ...action.payload };
    }
    default:
      return;
  }
};
