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

function PressableComponent(props) {
  return (
    <Pressable onPress={props.onPress}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box  {...props}
            bg={isPressed ? 'blueGray.500' : 'blueGray.700'}
            rounded="8">
            {props.children}
          </Box>
        );
      }}
    </Pressable>
  );
}

export default PressableComponent;
