import React, { useState, useEffect, useReducer, useRef } from 'react';
import {AppState} from 'react-native'
import { NativeBaseProvider, Text, Box, Fab, Icon } from 'native-base';
import theme from './theme';
import { NavigationContainer } from '@react-navigation/native';
import WorkoutListNavigator from './screens/WorkoutList/WorkoutListNavigator';
import WorkoutList from './screens/WorkoutList/WorkoutList';
import { UserDataContextProvider } from './context/UserDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './components/global/Loading';
import { userDataReducer } from './reducers/UserDataReducer';
import { useAsyncStorage } from './hooks/useAsyncStorage';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

// let userData = {
//   workouts: {
//     id: {
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
// };

export default function App() {
  // load and cache data
  // if there is no data, set initial skeleton of data.
  const initial_state = {
    workouts: {},
  };

  const [state, dispatch] = useReducer(userDataReducer, null);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current)
  const [loading, setLoading] = useState(true);
  const [storageValue, updateStorage] = useAsyncStorage('userData');

  const storeData = async () => {
    let fakeTimer;
    try {
      console.log('setting loading as true');
      setLoading(true);
      await updateStorage(state);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('setting loading as false');
      setLoading(false);
    }
  };

  // listen to background foreground changes
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        storeData();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // listen to userData state and update on change
  useEffect(() => {
    // AsyncStorage.clear();
    const cacheData = async () => {
      try {
        // try to laod data
        // console.log('checking AsyncStorage data');
        const storageData = await AsyncStorage.getItem('userData');
        // if there is data, cache data into state,
        //  else set empty data in async storage and state.
        if (storageData !== null) {
          console.log('data found');
          const empty_data = JSON.parse(storageData);
          dispatch({ type: 'INITIALIZE_STATE', payload: empty_data });
        } else {
          console.log('no data found, setting initial data to asyncstorage');
          try {
            await AsyncStorage.setItem(
              'userData',
              JSON.stringify(initial_state)
            );
            dispatch({ type: 'INITIALIZE_STATE', payload: initial_state });
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
    }


  }, [state]);

  const ClearDataFab = () => {
    return (
      <Fab
        renderInPortal={false}
        onPress={() => {
          AsyncStorage.clear();
          dispatch({ type: 'CLEAR_DATA', payload: initial_state });
        }}
        bg="#bd1133"
        size="lg"
        placement={'bottom-left'}
        icon={<Icon as={FontAwesome} name="times" size="sm" />}
      />
    );
  };

  return (
    <UserDataContextProvider
      value={{ state, dispatch, loading, setLoading, storeData }}>
      <NativeBaseProvider theme={theme}>
        <Box
          minHeight="full"
          _light={{ bg: 'coolGray.50' }}
          _dark={{ bg: 'coolGray.900' }}>
          <NavigationContainer>
            {loading && <Loading />}
            {state !== null && <WorkoutListNavigator />}
          </NavigationContainer>
        </Box>
      </NativeBaseProvider>
    </UserDataContextProvider>
  );
}
