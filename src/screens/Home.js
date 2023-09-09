import {Box, Button, HStack, Image, Text, VStack} from 'native-base';
import React from 'react';
import {PRIMARY} from '../utils/colors';
import {WW} from '../utils/size';

const Home = route => {
  const Navigation = route.route.navigation;
  return (
    <VStack
      space="10"
      flex={1}
      bg={PRIMARY.BLUE}
      justifyContent={'center'}
      alignItems={'center'}>
      <Image
        source={require('../assets/images/logo.png')}
        alt="Alternate Text"
        size="xl"
      />
      <HStack justifyContent={'space-between'} w={WW * 0.8}>
        <Button
          shadow="3"
          size={WW * 0.3}
          rounded={'full'}
          bg={PRIMARY.ORANGE}
          colorScheme="orange"
          onPress={() => Navigation.navigate('Customer')}>
          <Text
            fontWeight={'semibold'}
            color="white"
            textAlign={'center'}
            fontSize="xl">
            Manage Customer
          </Text>
        </Button>
        <Button
          shadow="3"
          size={WW * 0.3}
          rounded={'full'}
          bg={PRIMARY.ORANGE}
          colorScheme="orange"
          onPress={() => Navigation.navigate('Order')}>
          <Text
            fontWeight={'semibold'}
            color="white"
            textAlign={'center'}
            fontSize="xl">
            Manage Order
          </Text>
        </Button>
      </HStack>
    </VStack>
  );
};

export default Home;
