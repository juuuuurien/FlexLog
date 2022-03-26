import React from 'react';
import {Dimensions} from 'react-native'
import { Text, Heading, HStack, Box, Center , Spinner} from 'native-base';

const Loading = () => {
  return (
    <Center w="full" h='full' mh='auto' style={{ position: 'absolute', backgroundColor: '00000020', zIndex: 999}} justifyContent="center" >
      <Spinner size='lg' />
    </Center>
  );
};

export default Loading;
