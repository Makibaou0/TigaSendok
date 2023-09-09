import React from 'react';
import {Box, Button, Image, Text, VStack} from 'native-base';
import {PRIMARY} from '../utils/colors';
import {WH, WW} from '../utils/size';

const Welcome = route => {
  const Navigation = route.route.navigation;
  return (
    <Box bg={PRIMARY.BLUE} flex={1}>
      <VStack
        space="10"
        w={WW}
        h={WH}
        position={'absolute'}
        alignItems={'center'}
        justifyContent={'center'}>
        <Image
          source={require('../assets/images/logo.png')}
          alt="Alternate Text"
          size="xl"
        />
        <VStack w="100%" px={10} space="5">
          <Button
            bg={PRIMARY.ORANGE}
            colorScheme="orange"
            borderRadius={5}
            onPress={() => Navigation.navigate('Register')}>
            <Text fontSize="xl" fontWeight={'semibold'} color="white">
              Register
            </Text>
          </Button>
          <Button
            bg={'white'}
            borderWidth={3}
            borderColor={PRIMARY.ORANGE}
            colorScheme="orange"
            borderRadius={5}
            onPress={() => Navigation.navigate('Login')}>
            <Text fontSize="xl" fontWeight={'semibold'} color={PRIMARY.ORANGE}>
              Login
            </Text>
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Welcome;
