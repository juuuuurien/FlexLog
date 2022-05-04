import {
  StyleSheet,
  Text,
  View,
  Alert,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { UserDataContext } from "../../context/UserDataContext";
import { FAB, Portal, withTheme, useTheme, Colors } from "react-native-paper";

import ListItem from "./components/ListItem";
import CreateWorkoutModal from "./components/CreateWorkoutModal";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  Extrapolate,
} from "react-native-reanimated";

const HEADER_HEIGHT_MAX = 140;
const HEADER_HEIGHT_MIN = 80;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

const HeaderComponent = ({
  title,
  style,
  animatedHeaderStyle,
  animatedTitleStyle,
}) => {
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      height: HEADER_HEIGHT_MAX,
      width: "100%",
      flex: 1,
      flexDirection: "row",
      padding: 10,
      alignItems: "center",
      backgroundColor: "hotpink",
    },
    title: {
      color: "#FFF",
      fontWeight: "bold",
    },
  });

  return (
    <Animated.View style={[styles.container, animatedHeaderStyle]}>
      <Animated.Text style={[styles.title, animatedTitleStyle]}>
        Header Here
      </Animated.Text>
    </Animated.View>
  );
};

const NewWorkoutList = () => {
  const { colors } = useTheme();
  const { state, dispatch } = useContext(UserDataContext);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // On focus from navigation, update refresh state to refresh FlatList
    setRefreshing(!refreshing);
  }, [isFocused]);

  // handlers
  const handleDeleteItem = (id, name) => {
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

  // ==ANIMATIONS========================================================================================
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const animatedHeight = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_MAX - HEADER_HEIGHT_MIN],
      [HEADER_HEIGHT_MAX, HEADER_HEIGHT_MIN],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    );

    return { height: animatedHeight };
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    const animatedTitleScale = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_MAX - HEADER_HEIGHT_MIN],
      [1.75, 1],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    );

    const animatedTranslateX = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_MAX - HEADER_HEIGHT_MIN],
      [20, 0],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    );

    const animatedTranslateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT_MAX - HEADER_HEIGHT_MIN],
      [18, 0],
      {
        extrapolateRight: Extrapolate.CLAMP,
      }
    );

    return {
      transform: [
        { scale: animatedTitleScale },
        { translateX: animatedTranslateX },
        { translateY: animatedTranslateY },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        style={styles.flatListContainer}
        contentContainerStyle={[
          styles.flatListContent,
          {
            minHeight:
              Dimensions.get("window").height +
              HEADER_HEIGHT_MAX -
              HEADER_HEIGHT_MIN,
          },
        ]}
        refreshing
        scrollHandler={scrollHandler}
        data={state.workouts}
        extraData={state.workouts}
        renderItem={({ item, index }) => {
          //   item, id, navigation, index, handleDelete
          return (
            <ListItem
              item={item}
              id={item.id}
              navigation={navigation}
              index={index}
              handleDelete={handleDeleteItem}
              keyExtractor={(item) => item.id}
            />
          );
        }}
      />
      <HeaderComponent
        animatedHeaderStyle={animatedHeaderStyle}
        animatedTitleStyle={animatedTitleStyle}
      />
      <CreateWorkoutModal
        show={() => {
          setShowModal(true);
        }}
        hide={() => setShowModal(false)}
        visible={showModal}
      />
      <FAB
        style={[styles.FABButton, { backgroundColor: colors.primary }]}
        icon={"plus"}
        onPress={() => {
          setShowModal(true);
        }}
      />
    </View>
  );
};

export default NewWorkoutList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  flatListContainer: {
    flexGrow: 1,
    backgroundColor: "navy",
  },
  flatListContent: {
    width: "100%",
    backgroundColor: "pink",
    paddingHorizontal: 6,
    paddingTop: HEADER_HEIGHT_MAX + 10,
  },
  FABButton: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
