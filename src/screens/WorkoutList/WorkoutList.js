import React, {
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { FlatList } from "react-native";
import { FAB, Portal, withTheme, useTheme, Colors } from "react-native-paper";
import ListItem from "./components/ListItem";
import { UserDataContext } from "../../context/UserDataContext";
import CreateWorkoutModal from "./components/CreateWorkoutModal";
import dayjs from "dayjs";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

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

  const getFlatlistData = useCallback(() => {
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
  }, [state.workouts]);

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
              s
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
  const HEADER_HEIGHT_MAX = 180;
  const HEADER_HEIGHT_MIN = 75;

  const scrollY = useSharedValue(0);
  useEffect(() => {
    scrollY.value = 0;
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const stylez = useAnimatedStyle(() => {
    const height = HEADER_HEIGHT_MAX - scrollY.value;

    return {
      position: "absolute",
      flexDirection: "column",
      height: height > HEADER_HEIGHT_MIN ? height : HEADER_HEIGHT_MIN,
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      elevation: 100,
    };
  });

  const headerFontStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [0, HEADER_HEIGHT_MIN], [1.2, 1]);
    const x = interpolate(scrollY.value, [0, HEADER_HEIGHT_MIN], [35, 5]);

    return {
      color: "#FFF",
      fontSize: 22,
      transform: [
        {
          scale: scale,
        },
        { translateX: x },
      ],
    };
  });

  const jumboFontStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, HEADER_HEIGHT_MIN], [1, 0]);

    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_MIN],
      [0, -5]
    );

    return {
      color: "#FFF",
      fontSize: 28,
      fontWeight: "bold",
      opacity: opacity,
      transform: [{ translateY: translateY }],
    };
  });

  const CustomHeader = () => {
    return (
      <Animated.View style={[stylez]}>
        <View
          style={{
            width: "100%",
            paddingTop: 20,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <Animated.Text style={[jumboFontStyle]}>
            Good morning, Julien
          </Animated.Text>
        </View>
        <View
          style={{
            height: HEADER_HEIGHT_MIN,
            width: "100%",
            backgroundColor: "transparent",
            justifyContent: "center",
          }}
        >
          <Animated.Text style={[headerFontStyle]}>Your workouts</Animated.Text>
        </View>
      </Animated.View>
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
        <Animated.FlatList
          onContentSizeChange={() => {
            listRef.current?.scrollToEnd();
          }}
          contentContainerStyle={{
            minHeight:
              Dimensions.get("window").height +
              HEADER_HEIGHT_MAX -
              HEADER_HEIGHT_MIN,
            paddingTop: HEADER_HEIGHT_MAX,
          }}
          bounces={false}
          style={[styles.flatList]}
          data={getFlatlistData()}
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
        />
      </View>
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

  return (
    <>
      <View style={styles.container}>
        {state.workouts !== null && Object.keys(state.workouts).length > 0 ? (
          <ListScreen />
        ) : (
          <EmptyListScreen />
        )}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    marginVertical: 6,
  },
  flatList: { width: "100%" },
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
