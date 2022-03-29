import React, { useContext, useState } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { Box, Icon, AddIcon, Center, Fab } from 'native-base';
import { Provider as PaperProvider, FAB, Portal, withTheme, useTheme} from 'react-native-paper';
import WorkoutListItem from './components/WorkoutListItem';
import { UserDataContext } from '../../context/UserDataContext';
import CreateWorkoutModal from './components/CreateWorkoutModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';

const initial_state = {
  workouts: {},
};

const data = [
  { id: 'bd96-145571e29d72', date: 'July 7, 2022', name: 'Push Day' },
];

const WorkoutList = ({ navigation }) => {
  const { state, dispatch } = useContext(UserDataContext);
  const [showModal, setShowModal] = useState(false);

  const {colors} = useTheme();

  // const ListComponent = () => {
  //   return (
  //     <FlatList
  //       data={Object.keys(state.workouts)}
  //       keyExtractor={(item) => {
  //         return item;
  //       }}
  //       renderItem={({ item }) => {
  //         return (
  //           <WorkoutListItem
  //             id={item}
  //             item={state.workouts[item]}
  //             navigation={navigation}
  //           />
  //         );
  //       }}
  //     />
  //   );
  // };
  const ListComponent = () => {

    return (
      <FlatList
      style={{width: '100%', padding: 5}}
        data={Object.keys(state.workouts)}
        keyExtractor={(item) => {
          return item
        }}
        renderItem={({item}) => {
          return (
           <WorkoutListItem
            id={item}
              item={state.workouts[item]}
              navigation={navigation}
            />
          );
        }}
      />
    );
  };

  const EmptyListComponent = () => {
    
    return (
      <View style={styles.container}>
        <Text >{'You have not logged any workouts.'}</Text>
        <Text>{`Press the '+' to add one.`}</Text>
      </View>
    );
  };

  // const data = userData.workouts;

  // return (
  //   <Box
  //     _light={{ bg: "coolGray.50" }}
  //     _dark={{ bg: "coolGray.900" }}
  //     h="100%"
  //     justifyContent="center"
  //     p={5}
  //   >
  //     {state.workouts !== null && Object.keys(state.workouts).length > 0 ? (
  //       <ListComponent />
  //     ) : (
  //       <EmptyListComponent />
  //     )}
  //     <CreateWorkoutModal showModal={showModal} setShowModal={setShowModal} />
  //     <Fab
  //       renderInPortal={false}
  //       onPress={() => setShowModal(true)}
  //       size="lg"
  //       right={25}
  //       bottom={25}
  //       icon={<AddIcon size="sm" />}
  //     />
  //     <Fab
  //       renderInPortal={false}
  //       onPress={() => {
  //         dispatch({ type: "CLEAR_DATA", payload: initial_state });
  //         AsyncStorage.clear();
  //       }}
  //       bg="#bd1133"
  //       size="lg"
  //       placement={"bottom-left"}
  //       icon={<Icon as={Feather} name="x" size="xs" />}
  //     />
  //   </Box>
  // );

  return (
    <View style={styles.container}>
      {state.workouts !== null && Object.keys(state.workouts).length > 0 ? (
        <ListComponent />
      ) : (
        <EmptyListComponent />
      )}
      <Portal>
        <CreateWorkoutModal showModal={showModal} setShowModal={setShowModal} />
      </Portal>
      <FAB
        style={styles.fab}
        icon={'plus'}
        onPress={() => {
          setShowModal(true);
        }}
      />
       <Fab
        renderInPortal={false}
        onPress={() => {
          dispatch({ type: "CLEAR_DATA", payload: initial_state });
          AsyncStorage.clear();
        }}
        bg="#bd1133"
        size="lg"
        placement={"bottom-left"}
        icon={<Icon as={Feather} name="x" size="xs" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default withTheme(WorkoutList);
