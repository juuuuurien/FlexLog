import React, { useState, useEffect, useReducer, useRef } from "react";
import { AppState } from "react-native";
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { UserDataContextProvider } from "./src/context/UserDataContext";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAsyncStorage } from "./src/hooks/useAsyncStorage";
import { userDataReducer } from "./src/reducers/UserDataReducer";
import Loading from "./src/components/global/Loading";
import WorkoutListNavigator from "./src/screens/WorkoutList/WorkoutListNavigator";

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
  const [loading, setLoading] = useState(true);
  const [storageValue, updateStorage] = useAsyncStorage("userData", {
    ...initial_state,
  });

  const storeData = async () => {
    try {
      setLoading(true);
      await updateStorage(state);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // listen to background foreground changes
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("in the background");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  // listen to userData state and update on change
  useEffect(() => {
    // AsyncStorage.clear();
    const cacheData = async () => {
      try {
        // try to laod data
        // console.log('checking AsyncStorage data');
        const storageData = await AsyncStorage.getItem("userData");
        // if there is data, cache data into state,
        //  else set empty data in async storage and state.
        if (storageData !== null) {
          console.log("data found");
          const empty_data = JSON.parse(storageData);
          dispatch({ type: "INITIALIZE_STATE", payload: empty_data });
        } else {
          console.log("no data found, setting initial data to asyncstorage");
          try {
            AsyncStorage.setItem(
              "userData",
              JSON.stringify({ ...initial_state })
            );
            dispatch({ type: "INITIALIZE_STATE", payload: initial_state });
          } catch (err) {
            console.warn(err);
          }
        }
      } catch {
        (err) => {
          console.warn(err);
        };
      } finally {
        storeData();
      }
    };

    // attempt to cache data
    if (state === null) {
      cacheData();
    } else {
      console.log("storing data");
      storeData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const papertheme = {
    ...PaperDarkTheme,
  };

  // const ClearDataFab = () => {
  //   return (
  //     <Fab
  //       renderInPortal={false}
  //       onPress={() => {
  //         AsyncStorage.clear();
  //         dispatch({ type: 'CLEAR_DATA', payload: initial_state });
  //       }}
  //       bg="#bd1133"
  //       size="lg"
  //       placement={'bottom-left'}
  //       icon={<Icon as={FontAwesome} name="times" size="sm" />}
  //     />
  //   );
  // };

  const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...PaperDarkTheme.colors,
      ...NavigationDarkTheme.colors,
      backgroundColor: "#121317",
      cardColor: "#1F2024",
    },
  };

  return (
    <UserDataContextProvider
      value={{ state, dispatch, loading, setLoading, storeData }}
    >
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          {loading && <Loading />}
          {state !== null && <WorkoutListNavigator />}
        </NavigationContainer>
      </PaperProvider>
    </UserDataContextProvider>
  );
}
