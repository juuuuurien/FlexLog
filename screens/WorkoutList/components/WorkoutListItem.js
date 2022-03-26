import React from 'react';
import {
  Box,
  Text,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Icon,
  AddIcon,
} from 'native-base';

import PressableComponent from '../../../components/global/PressableComponent';

const handlePress = (navigation, params) => {};

const WorkoutListItem = ({ item, id, navigation }) => {
  return (
    <PressableComponent
      borderWidth="1"
      _dark={{
        backgroundColor: 'blueGray.600',
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      borderRadius={5}
      px="5"
      py="2"
      my="1.5"
      onPress={() => navigation.navigate('WorkoutPage', { id: id })}>
      <HStack space={3} alignItems="center" justifyContent="space-around">
        <Text bold isTruncated fontSize="md">
          {item.name}
        </Text>
        <Text italic fontSize="xs" color="info.300">
          {item.date}
        </Text>
      </HStack>
    </PressableComponent>
  );
};

export default WorkoutListItem;
