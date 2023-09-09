import React, {useEffect, useState} from 'react';
import {
  Box,
  FlatList,
  Text,
  Spinner,
  HStack,
  Pressable,
  ChevronLeftIcon,
  AddIcon,
  VStack,
  Input,
  Radio,
  Button,
  useToast,
} from 'native-base';
import {PRIMARY, SECONDARY} from '../utils/colors';
import {WH, inset} from '../utils/size';
import {
  DeleteCustomerApi,
  DetailCustomerApi,
  GetAllCustomer,
  GetAllProduct,
  UpdateCustomerApi,
} from '../utils/configApi';
import {CommonActions} from '@react-navigation/native';

const DetailCustomer = route => {
  const Navigation = route.route.navigation;
  const params = route.route.route.params;
  const [name, setname] = useState(params.name);
  const [gender, setgender] = useState(params.gender);
  const [phone, setphone] = useState(params.phone);
  const toast = useToast();
  const handleNameChange = Text => {
    setname(Text);
  };
  const handleGenderChange = Text => {
    setgender(Text);
  };
  const handlephoneChange = Text => {
    setphone(Text);
  };
  const handleSubmit = async () => {
    const submit = await UpdateCustomerApi({
      key: 'customers',
      id: params.id,
      params: {
        name: name,
        gender: gender,
        phone: phone,
      },
    });
    if (submit.status == 'Success') {
      Navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Customer'}], // Replace 'Home' with the name of the screen you want to navigate to
        }),
      );
      toast.show({
        title: 'Success',
        bg: 'success.500',
        duration: 1000,
      });
      setname('');
      setgender('');
      setphone('');
    } else {
      toast.show({
        title: 'Error',
        bg: 'danger.500',
        duration: 1000,
      });
    }
  };
  const handleDelete = async () => {
    const submit = await DeleteCustomerApi({
      key: 'customers',
      id: params.id,
      params: {
        name: name,
        gender: gender,
        phone: phone,
      },
    });
    if (submit.status == 'Success') {
      Navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Customer'}], // Replace 'Home' with the name of the screen you want to navigate to
        }),
      );
      toast.show({
        title: 'Success',
        bg: 'success.500',
        duration: 1000,
      });
      setname('');
      setgender('');
      setphone('');
    } else {
      toast.show({
        title: 'Error',
        bg: 'danger.500',
        duration: 1000,
      });
    }
  };
  return (
    <Box flex={1} bg={PRIMARY.BLUE}>
      <HStack
        bg={PRIMARY.BLUE}
        p={2}
        pb="5"
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
        <Text fontSize="xl" color="white" fontWeight={'semibold'}>
          Update Customer
        </Text>
        <Box
          alignItems={'center'}
          justifyContent={'center'}
          onPress={() => {
            console.log('hello');
          }}>
          <HStack alignItems={'center'} space="2">
            <AddIcon size={6} color={PRIMARY.BLUE} />
            <Text color={PRIMARY.BLUE} fontSize="md">
              New
            </Text>
          </HStack>
        </Box>
      </HStack>
      <VStack space="5">
        <HStack px="5" space="4" alignItems={'center'}>
          <Box flex="0.3">
            <Text color="white" fontSize="md">
              Name
            </Text>
          </Box>
          <Input
            value={name}
            onChangeText={Text => handleNameChange(Text)}
            _focus={{
              bg: 'white',
            }}
            bg="white"
            flex="1"
            placeholder="Name"
            fontSize={'md'}
          />
        </HStack>
        <HStack px="5" space="4">
          <Box flex="0.3">
            <Text color="white" fontSize="md">
              Gender
            </Text>
          </Box>
          <Radio.Group
            name="MyRadioGroup"
            space="2"
            value={gender} // 3. Set state sebagai nilai radio yang dipilih
            onChange={value => handleGenderChange(value)} // 4. Fungsi pengganti untuk memperbarui state
          >
            <VStack space="2">
              <Radio size={'sm'} value="male">
                <Text color="white" fontSize="md">
                  Male
                </Text>
              </Radio>
              <Radio size={'sm'} value="female">
                <Text color="white" fontSize="md">
                  Female
                </Text>
              </Radio>
              <Radio size={'sm'} value="other">
                <Text color="white" fontSize="md">
                  Other
                </Text>
              </Radio>
            </VStack>
          </Radio.Group>
        </HStack>
        <HStack px="5" space="4" alignItems={'center'}>
          <Box flex="0.3">
            <Text color="white" fontSize="md">
              Phone
            </Text>
          </Box>
          <Input
            value={phone}
            onChangeText={Text => handlephoneChange(Text)}
            keyboardType="number-pad"
            _focus={{
              bg: 'white',
            }}
            bg="white"
            flex="1"
            placeholder="Phone"
            fontSize={'md'}
          />
        </HStack>
      </VStack>
      <Button
        mx="5"
        mt={WH * 0.1}
        bg={PRIMARY.ORANGE}
        colorScheme="orange"
        onPress={() => handleSubmit()}>
        <Text fontSize="md" color="white" fontWeight={'semibold'}>
          Submit
        </Text>
      </Button>
      <Button
        mx="5"
        mt={5}
        bg={SECONDARY.RED}
        colorScheme="danger"
        onPress={() => handleDelete()}>
        <Text fontSize="md" color="white" fontWeight={'semibold'}>
          Delete
        </Text>
      </Button>
    </Box>
  );
};

export default DetailCustomer;
