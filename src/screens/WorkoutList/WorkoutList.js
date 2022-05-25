import React, {
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import { StatusBar } from "react-native";
import { FAB, Portal, withTheme, useTheme, Colors } from "react-native-paper";
import ListItem from "./components/ListItem";
import { UserDataContext } from "../../context/UserDataContext";
import CreateWorkoutModal from "./components/CreateWorkoutModal";
import dayjs from "dayjs";
import Animated, {
  Extrapolate,
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

const initial_state = {
  workouts: {},
};

const WorkoutList = ({ navigation }) => {
  const { colors } = useTheme();
  const { state, dispatch } = useContext(UserDataContext);
  const [showModal, setShowModal] = useState(false);

  // const ListComponent = () => {
  //   return (
  //     <FlatList
  //       data={Object.keys(state.workouts)}
  //       keyExtractor={(item) => {
  //         return item;
  //       }}
  //       renderItem={({ item }) => {
  //         return (
  //           <ListItem
  //             id={item}
  //             item={state.workouts[item]}
  //             navigation={navigation}
  //           />
  //         );
  //       }}
  //     />
  //   );
  // };

  // To sort each list item into its own Month / Year ---
  // Get array of workout date strings converted into Month Year format.

  // for ( const id in state.workouts ) {
  //   console.log(dayjs(state.workouts[id].date).format('MMMM YYYY'))
  // }

  // init workout list header

  const handleDelete = (id, name) => {
    Alert.alert("Delete this workout?", `Do you want to delete "${name}" ?`, [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          dispatch({ type: "DELETE_WORKOUT", payload: id });
        },
      },
    ]);
  };

  const getFlatlistData = () => {
    const formatToMMMMYYYY = Object.keys(state.workouts).map((id) =>
      dayjs(state.workouts[id].date).format("MMMM YYYY")
    );
    const sectionTitles = [...new Set(formatToMMMMYYYY)];

    const data = sectionTitles.map((monthAndYear) => {
      let obj = {};
      let arr = [];
      for (const id in state.workouts) {
        if (dayjs(state.workouts[id].date).format("MMMM YYYY") === monthAndYear)
          arr.push(id);
      }
      obj = { [monthAndYear]: arr };
      return obj;
    });

    return data;
  };

  const WorkoutListSection = ({ monthAndYear, ids }) => {
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[styles.dateHeader, { color: colors.text }]}
        >{`${monthAndYear}`}</Text>
        {ids.map((id, index) => {
          return (
            <ListItem
              key={id}
              id={id}
              item={state.workouts[id]}
              navigation={navigation}
            />
          );
        })}
      </View>
    );
  };
  // HEADER ANIMATIONS ========================
  const HEADER_HEIGHT_MAX = 200;
  const HEADER_HEIGHT_MIN = 80;
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

  const scrollY = useSharedValue(0);

  useEffect(() => {
    scrollY.value = 0;
  }, [state.workouts]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerContainer = useAnimatedStyle(() => {
    const height = HEADER_HEIGHT_MAX - scrollY.value;

    return {
      width: "100%",
      position: "absolute",
      flexDirection: "column",
      height: height > HEADER_HEIGHT_MIN ? height : HEADER_HEIGHT_MIN,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: 14,
      backgroundColor: colors.background,
      elevation: 5,
    };
  });

  const jumboFontStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, (HEADER_HEIGHT_MIN * 2) / 3],
      [1, 0]
    );

    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_MIN],
      [0, 55],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    );

    return {
      color: "#FFF",
      fontSize: 28,
      fontWeight: "bold",
      opacity: opacity,
      transform: [{ translateY: translateY }],
    };
  });

  const headerLabelContainer = useAnimatedStyle(() => {
    const translateContentY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_MIN],
      [0, STATUS_BAR_HEIGHT],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    );
    const height = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_MIN],
      [HEADER_HEIGHT_MIN, HEADER_HEIGHT_MIN + STATUS_BAR_HEIGHT],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    );
    return {
      height: HEADER_HEIGHT_MIN,
      transform: [{ translateY: STATUS_BAR_HEIGHT / 2 }],
    };
  });

  const CustomHeader = () => {
    return (
      <Animated.View style={[headerContainer]}>
        <View
          style={{
            width: "100%",
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <Animated.Text style={[jumboFontStyle]}>
            Good morning, Julien
          </Animated.Text>
        </View>
        <Animated.View
          style={[
            {
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            },
            headerLabelContainer,
          ]}
        >
          <Animated.Text
            style={[
              {
                color: "#FFF",
                fontSize: 20,
              },
            ]}
          >
            Your workouts
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    );
  };

  const EmptyListScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.text }}>
          {"You have not logged any workouts."}
        </Text>
        <Text
          style={{ color: colors.text }}
        >{`Press the '+' to add one.`}</Text>
      </View>
    );
  };

  const ListScreen = () => {
    // Flatlist receives an object
    // as such {
    //          'dateString': [id, id id],
    //          'dateString2': [id, id id]
    //         }

    const listRef = useRef();

    return (
      <View style={{ width: "100%" }}>
        <CustomHeader />
      </View>
    );
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     setFlatlistData(state.workouts);
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  // useEffect(() => {
  //   setFlatlistData(state.workouts);
  // }, [state.workouts]);

  // console.log(state.workouts);

  return useMemo(() => {
    return (
      <View style={styles.container}>
        {/* <Animated.FlatList
        ListEmptyComponent={EmptyListScreen}
        contentContainerStyle={{
          minHeight:
            Dimensions.get("window").height +
            HEADER_HEIGHT_MAX -
            HEADER_HEIGHT_MIN +
            STATUS_BAR_HEIGHT,
          paddingTop: HEADER_HEIGHT_MAX,
        }}
        bounces={false}
        style={[styles.flatList]}
        data={getFlatlistData()}
        extraData={state.workouts}
        scrollEventThrottle={1}
        onScroll={scrollHandler}
        keyExtractor={(_, index) => {
          return index;
        }}
        renderItem={({ item }) => {
          const monthAndYear = Object.keys(item)[0];
          const ids = item[monthAndYear];
          return <WorkoutListSection monthAndYear={monthAndYear} ids={ids} />;
        }}
      /> */}

        <FlatList
          style={styles.flatList}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          bounces={false}
          data={state.workouts}
          extraData={state.workouts}
          keyExtractor={({ id }) => {
            return id;
          }}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                handleDelete={handleDelete}
                id={item.id}
                index={index}
                item={item}
                navigation={navigation}
              />
            );
          }}
        />
        {/* <Animated.ScrollView
        contentContainerStyle={{
          minHeight:
            Dimensions.get("window").height +
            HEADER_HEIGHT_MAX -
            HEADER_HEIGHT_MIN +
            STATUS_BAR_HEIGHT,
          paddingTop: HEADER_HEIGHT_MAX,
        }}
        bounces={false}
        style={[styles.flatList]}
      >
        {Object.keys(state.workouts).map((id, index) => {
          return (
            <ListItem
              key={id}
              id={id}
              item={state.workouts[id]}
              navigation={navigation}
            />
          );
        })}
      </Animated.ScrollView> */}
        <Portal>
          <CreateWorkoutModal
            show={() => {
              setShowModal(true);
            }}
            hide={() => setShowModal(false)}
            visible={showModal}
          />
        </Portal>
        <FAB
          style={[styles.fab, { backgroundColor: colors.primary }]}
          icon={"plus"}
          onPress={() => {
            setShowModal(true);
          }}
        />
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    marginVertical: 6,
  },
  flatList: { flex: 1, width: "100%", paddingHorizontal: 6 },
  dateHeader: {
    paddingHorizontal: 14,
    paddingBottom: 4,
    paddingTop: 4,
    fontSize: 12,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default withTheme(WorkoutList);
