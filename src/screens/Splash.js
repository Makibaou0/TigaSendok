import {Box, Image, Text} from 'native-base';
import React, {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import {getDataFromMMKV} from '../utils/configMMKV';
import {PRIMARY} from '../utils/colors';
import {WH, WW} from '../utils/size';

const Splash = route => {
  const Navigation = route.route.navigation;
  const token = getDataFromMMKV('token');
  useEffect(() => {
    setTimeout(() => {
      if (token !== null) {
        Navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}], // Replace 'Home' with the name of the screen you want to navigate to
          }),
        );
      } else {
        Navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Welcome'}], // Replace 'Home' with the name of the screen you want to navigate to
          }),
        );
      }
    }, 500); //
  }, []);

  return (
    <Box bg={PRIMARY.BLUE} flex={1}>
      <Box
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
        <Text fontWeight={'bold'} fontSize="3xl" color="white">
          Tiga Sendok
        </Text>
      </Box>
    </Box>
  );
};

export default Splash;
