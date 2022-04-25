import React, { useState, useEffect, useReducer, useRef } from "react";
import { AppState } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { UserDataContextProvider } from "./src/context/UserDataContext";

import { NavigationContainer } from "@react-navigation/native";
import WorkoutListNavigator from "./src/screens/WorkoutList/WorkoutListNavigator";

import { userDataReducer } from "./src/reducers/UserDataReducer";

import Loading from "./src/components/global/Loading";
import { StatusBar } from "expo-status-bar";

import { CombinedDarkTheme } from "./src/theme";

import LoginScreen from "./src/auth/LoginScreen";
import AuthNavigator from "./src/auth/AuthNavigator";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api/firebase";

// let userData = {
//   workouts: {
//     id: {
//       date: string,
//       finished: boolean,
//       exercises: [
//         {
//           name: string,
//           sets: [
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
// };

export default function App() {
  const initial_state = {
    workouts: {},
  };

  const [state, dispatch] = useReducer(userDataReducer, null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [loading, setLoading] = useState(false);
  // const [storageValue, updateStorage] = useAsyncStorage("userData", {
  //   ...initial_state,
  // });

  const storeData = async () => {
    // try {
    //   // console.log('Updating Storage');
    //   // console.log(state, 'This is state');
    //   setLoading(true);
    //   updateStorage(state);
    // } catch (e) {
    //   console.warn(e);
    // } finally {
    //   setLoading(false);
    // }
  };

  // listen to background foreground changes
  // useEffect(() => {
  //   const subscription = AppState.addEventListener("change", (nextAppState) => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === "active"
  //     ) {
  //       console.log("in the background");
  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //   });

  //   return () => {
  //     if (subscription) subscription.remove();
  //   };
  // }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) console.log(user);
    });
  });

  const fake_data = {
    workouts: {
      l3azxdoohq0okwmwzjc: {
        date: "Apr 22, 24",
        exercises: [],
        finished: false,
        name: "T",
        started: false,
      },
      l4b0low64a97ueok30m: {
        date: "June 22, 22",
        exercises: [],
        finished: false,
        name: "T",
        started: false,
      },
      l5b0low64a97ueok30m: {
        date: "June 22, 22",
        exercises: [],
        finished: false,
        name: "T",
        started: false,
      },
      l6b0lmug5tijuibslr6: {
        date: "May 22, 22",
        exercises: [],
        finished: false,
        name: "H",
        started: false,
      },
      l7b0low64a97ueok30m: {
        date: "June 22, 22",
        exercises: [],
        finished: false,
        name: "T",
        started: false,
      },
      l8b0lmug5tijuibslr6: {
        date: "Jul 22, 22",
        exercises: [],
        finished: false,
        name: "H",
        started: false,
      },
      l9b0lmug5tijuibslr6: {
        date: "May 22, 22",
        exercises: [],
        finished: false,
        name: "H",
        started: false,
      },
    },
  };

  // listen to userData state and update on change
  useEffect(() => {
    //  check if user is logged in or not...
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <NavigationContainer theme={CombinedDarkTheme}>
        <AuthNavigator />
      </NavigationContainer>
    </PaperProvider>
  );

  // return (
  //   <UserDataContextProvider
  //     value={{ state, dispatch, loading, setLoading, storeData }}
  //   >
  //     <PaperProvider theme={CombinedDarkTheme}>
  //       <NavigationContainer theme={CombinedDarkTheme}>
  //         {loading && <Loading />}
  //         {state !== null && <WorkoutListNavigator />}
  //       </NavigationContainer>
  //       <StatusBar style="light" />
  //     </PaperProvider>
  //   </UserDataContextProvider>
  // );
}
