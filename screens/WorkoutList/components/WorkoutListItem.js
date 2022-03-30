import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { List, Colors, Caption, useTheme } from 'react-native-paper';
import PressableComponent from '../../../components/global/PressableComponent';
import { UserDataContext } from '../../../context/UserDataContext';
import { omit } from '../../../util/omit';

const WorkoutListItem = ({ item, id, navigation }) => {
  const { blueGrey100, blueGrey200 } = Colors;
  const { colors } = useTheme();
  const { dispatch } = useContext(UserDataContext);
  const [longPressed, setLongPressed] = useState(false);
  const [pressed, setPressed] = useState(false);
  const handleLongPress = () => {
    setPressed(false);
    Alert.alert(
      'Delete this workout?',
      `Do you want to delete "${item.name}" ?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch({ type: 'DELETE_WORKOUT', payload: id });
          },
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    listItem: {
      flex: 1,
      margin: 5,
      backgroundColor: pressed ? blueGrey200 : colors.background,
      borderBottomWidth: 2,
      borderColor: blueGrey200,
      elevation: 1,
    },
    caption: {
      padding: 10,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    titleStyle: { fontWeight: 'bold', fontSize: 22 },
  });

  return (
    <Pressable
      onLongPress={handleLongPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => {
        navigation.navigate('WorkoutPage', { id: id });
      }}>
      <List.Item
        style={styles.listItem}
        titleStyle={styles.titleStyle}
        title={item.name}
        description={`Created: ${item.date}`}
        right={(props) => <Caption style={styles.caption}>Not Started</Caption>}
      />
    </Pressable>
  );
};

export default WorkoutListItem;
