import React, { useContext, useState } from 'react';
import { StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { List, Colors, Caption, useTheme } from 'react-native-paper';
import { UserDataContext } from '../../../context/UserDataContext';

const WorkoutListItem = ({ item, id, navigation }) => {
  const { blueGrey200 } = Colors;
  const { colors } = useTheme();
  const { dispatch } = useContext(UserDataContext);
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

  const handleCaption = () => {
    if (item.finished) return 'Finished';
    if (item.started && !item.finished) return 'In Progress';
    return 'Not Started';
  };

  const handleColor = () => {
    if (item.started && !item.finished) return Colors.green600;
    if (item.started === true && item.finished === true) return Colors.grey600;
    return Colors.grey600;
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
      color: handleColor(),
      padding: 10,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    titleStyle: { fontWeight: 'bold', fontSize: 22 },
  });

  return (
    <Pressable
      onLongPress={handleLongPress}
      onPressIn={() => {
        Platform.OS === 'web'
          ? navigation.navigate('WorkoutPage', { id: id })
          : setPressed(true);
      }}
      onPressOut={() => setPressed(false)}
      onPress={() => {
        navigation.navigate('WorkoutPage', { id: id });
      }}>
      <List.Item
        style={styles.listItem}
        titleStyle={styles.titleStyle}
        title={item.name}
        description={`Created: ${item.date}`}
        right={() => (
          <Caption style={styles.caption}>{handleCaption()}</Caption>
        )}
      />
    </Pressable>
  );
};

export default WorkoutListItem;
