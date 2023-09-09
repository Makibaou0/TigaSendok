import React, {useState} from 'react';
import {
  Box,
  Button,
  ChevronLeftIcon,
  HStack,
  Image,
  Input,
  Pressable,
  Spinner,
  Text,
  VStack,
  useToast,
} from 'native-base';
import {PRIMARY} from '../utils/colors';
import {WH, WW, inset} from '../utils/size';
import axios from 'axios';
import {RegisterAPI, POSTAPI} from '../utils/configApi';
import {CommonActions} from '@react-navigation/native';
import {saveDataToMMKV} from '../utils/configMMKV';

const Register = route => {
  const Navigation = route.route.navigation;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();
  // Handler untuk memperbarui nilai email
  const handleEmailChange = text => {
    setEmail(text);
  };
  // Handler untuk memperbarui nilai email
  const handleNameChange = text => {
    setName(text);
  };

  // Handler untuk memperbarui nilai password
  const handlePasswordChange = text => {
    setPassword(text);
  };
  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
  };

  // Handler untuk menangani tindakan Register
  const handleLogin = async () => {
    setisLoading(true);
    if (password !== confirmPassword) {
      setisLoading(false);
      toast.show({
        title: 'Password Tidak Sesuai',
        duration: 1000,
        bg: 'danger.500',
      });
    } else {
      const submit = await RegisterAPI({
        key: 'login',
        params: {
          email: email,
          password: password,
        },
      });
      if (submit.status == 'Success') {
        saveDataToMMKV('token', submit.data.access_token);
        Navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}], // Replace 'Home' with the name of the screen you want to navigate to
          }),
        );
      }
      setisLoading(false);
      toast.show({
        title: submit.status,
        duration: 1000,
        bg: submit.status == 'Success' ? 'success.500' : 'danger.500',
      });
    }
  };
  return (
    <Box bg={PRIMARY.BLUE} flex={1}>
      <HStack
        ml={3}
        px={2}
        mt={inset().top}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Pressable
          alignItems={'center'}
          justifyContent={'center'}
          onPress={() => Navigation.goBack()}>
          <HStack alignItems={'center'} space="2">
            <ChevronLeftIcon size={6} color="white" />
            <Text color="white" fontSize="md">
              Back
            </Text>
          </HStack>
        </Pressable>
        <Text fontSize="3xl" color="white" fontWeight={'semibold'}>
          Register
        </Text>
        <Box
          alignItems={'center'}
          justifyContent={'center'}
          onPress={() => {
            console.log('hello');
          }}>
          <HStack alignItems={'center'} space="2">
            <ChevronLeftIcon size={6} color={PRIMARY.BLUE} />
            <Text color={PRIMARY.BLUE} fontSize="md">
              Back
            </Text>
          </HStack>
        </Box>
      </HStack>
      <VStack
        mt={WH * 0.1}
        space="50"
        w={WW}
        alignItems={'center'}
        justifyContent={'center'}>
        <Image
          source={require('../assets/images/logo.png')}
          alt="Alternate Text"
          size="xl"
        />
        <HStack px={5}>
          <VStack space={5} flex="1" justifyContent={'space-between'}>
            <HStack space="2">
              <Box flex="0.4">
                <Text fontSize="md" color="white">
                  Email
                </Text>
              </Box>
              <Input
                flex={1}
                onChangeText={Text => handleEmailChange(Text)}
                bg="white"
                fontSize={'md'}
                _focus={{bg: 'white'}}
                placeholder="Name"
              />
            </HStack>
            <HStack space="2">
              <Box flex="0.4">
                <Text fontSize="md" color="white">
                  Password
                </Text>
              </Box>
              <Input
                flex={1}
                secureTextEntry
                onChangeText={Text => handlePasswordChange(Text)}
                bg="white"
                fontSize={'md'}
                _focus={{bg: 'white'}}
                placeholder="Password"
              />
            </HStack>
            <HStack space="2">
              <Box flex="0.4">
                <Text fontSize="md" color="white">
                  Confirm Password
                </Text>
              </Box>
              <Input
                secureTextEntry
                flex={1}
                onChangeText={Text => handleConfirmPasswordChange(Text)}
                bg="white"
                fontSize={'md'}
                _focus={{bg: 'white'}}
                placeholder="Password"
              />
            </HStack>
          </VStack>
        </HStack>
        <Button
          w="90%"
          bg={PRIMARY.ORANGE}
          colorScheme="orange"
          borderRadius={5}
          onPress={() => handleLogin()}>
          <Text fontSize="xl" fontWeight={'semibold'} color={'white'}>
            Register
          </Text>
        </Button>
      </VStack>
      {isLoading == true && (
        <Box
          bg="dark.50"
          opacity="0.7"
          w={WW}
          h={WH}
          position={'absolute'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Spinner size="lg" />
        </Box>
      )}
    </Box>
  );
};

export default Register;
