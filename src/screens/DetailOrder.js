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
  Select,
  Actionsheet,
  useDisclose,
  ChevronDownIcon,
} from 'native-base';
import {PRIMARY, SECONDARY} from '../utils/colors';
import {WH, inset} from '../utils/size';
import {
  DeleteOrderApi,
  GetAllCustomer,
  GetAllOrder,
  GetAllProduct,
  PayOrderApi,
  UpdateOrderApi,
} from '../utils/configApi';
import {CommonActions} from '@react-navigation/native';
import {formattedCurrency} from '../utils/formatCurrency';

const DetailOrder = route => {
  const Navigation = route.route.navigation;
  const params = route.route.route.params;
  console.log(params.uuid);
  const [dataCustomer, setdataCustomer] = useState([]);
  const [qty, setqty] = useState(params.qty);
  const [dataProduct, setDataProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageProduct, setCurrentPageProduct] = useState(1);
  const [actionData, setactionData] = useState('Customer');
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [customer, setCustomer] = useState({
    id: params.customer.id,
    name: params.customer.name,
  });
  const [product, setproduct] = useState({
    id: params.product.id,
    name: params.product.name,
    price: params.product.price,
  });
  const [gender, setgender] = useState(params.gender);
  const [phone, setphone] = useState(params.phone);
  const {isOpen, onOpen, onClose} = useDisclose();
  const toast = useToast();
  useEffect(() => {
    fetchData();
    fetchDataProduct();
  }, []);

  const handleNameChange = Text => {
    onClose();
    if (actionData == 'Customer') {
      setCustomer({
        id: Text.id,
        name: Text.name,
      });
    } else {
      setproduct({
        id: Text.id,
        name: Text.name,
        price: Text.price,
      });
    }
  };

  const handleSubmit = async () => {
    const submit = await UpdateOrderApi({
      key: 'orders',
      id: params.id,
      params: {
        customer_id: customer.id,
        product_id: product.id,
        qty: qty,
        price: product.price,
      },
    });
    if (submit.status == 'Success') {
      Navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Order'}], // Replace 'Home' with the name of the screen you want to navigate to
        }),
      );
      toast.show({
        title: 'Success',
        bg: 'success.500',
        duration: 1000,
      });
    } else {
      toast.show({
        title: 'Error',
        bg: 'danger.500',
        duration: 1000,
      });
    }
  };
  const handleDelete = async () => {
    const submit = await DeleteOrderApi({
      key: 'orders',
      id: params.id,
    });
    if (submit.status == 'Success') {
      Navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Order'}], // Replace 'Home' with the name of the screen you want to navigate to
        }),
      );
      toast.show({
        title: 'Success',
        bg: 'success.500',
        duration: 1000,
      });
    } else {
      toast.show({
        title: 'Error',
        bg: 'danger.500',
        duration: 1000,
      });
    }
  };
  const handlePay = async () => {
    const submit = await PayOrderApi({
      key: 'orders',
      id: params.id,
    });
    if (submit.status == 'Success') {
      Navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Order'}], // Replace 'Home' with the name of the screen you want to navigate to
        }),
      );
      toast.show({
        title: 'Success',
        bg: 'success.500',
        duration: 1000,
      });
    } else {
      toast.show({
        title: 'API Pay Error',
        bg: 'danger.500',
        duration: 1000,
      });
    }
  };

  const fetchData = async () => {
    if (!hasMoreData || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await GetAllCustomer({
        page: currentPage,
      });

      const newData = response.data.data;

      if (newData.length > 0) {
        // Ada data baru, tambahkan ke data yang ada
        setdataCustomer([...dataCustomer, ...newData]);
        setCurrentPage(currentPage + 1);
      } else {
        // Tidak ada data lebih lanjut
        setHasMoreData(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDataProduct = async () => {
    if (!hasMoreData || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await GetAllProduct({
        page: currentPageProduct,
      });

      const newData = response.data.data;

      if (newData.length > 0) {
        // Ada data baru, tambahkan ke data yang ada
        setDataProduct([...dataProduct, ...newData]);
        setCurrentPageProduct(currentPageProduct + 1);
      } else {
        // Tidak ada data lebih lanjut
        setHasMoreData(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = item => {
    setactionData(item);
    console.log(item);
    onOpen();
  };
  const renderItem = ({item, key}) => (
    <Pressable
      mb="4"
      p="4"
      rounded="lg"
      alignItems={'center'}
      onPress={() => handleNameChange(item)}>
      <Text fontSize="md">{item.name}</Text>
    </Pressable>
  );

  const renderFooter = () => {
    if (loading) {
      return <Spinner color={PRIMARY.BLUE} />;
    } else {
      return null;
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
          Update Order #{params.id}
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
        <HStack
          px="5"
          space="4"
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Box flex="0.4">
            <Text color="white" fontSize="md">
              Customer
            </Text>
          </Box>

          <Pressable
            onPress={() => handleAction('Customer')}
            bg="white"
            flex={1}
            p={3}
            rounded="md">
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <Text fontSize="md">{customer.name}</Text>
              <ChevronDownIcon size="md" color={PRIMARY.ORANGE} />
            </HStack>
          </Pressable>
        </HStack>
        <HStack
          px="5"
          space="4"
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Box flex="0.4">
            <Text color="white" fontSize="md">
              Product
            </Text>
          </Box>

          <Pressable
            onPress={() => handleAction('Product')}
            bg="white"
            flex={1}
            p={3}
            rounded="md">
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <Text fontSize="md">{product.name}</Text>
              <ChevronDownIcon size="md" color={PRIMARY.ORANGE} />
            </HStack>
          </Pressable>
        </HStack>
        <HStack
          px="5"
          space="4"
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Box flex="0.4">
            <Text color="white" fontSize="md">
              Price
            </Text>
          </Box>

          <Box bg="blueGray.300" flex={1} p={3} rounded="md">
            <Text fontSize="md">Rp {formattedCurrency(product.price)}</Text>
          </Box>
        </HStack>
        <HStack
          px="5"
          space="4"
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Box flex="0.36">
            <Text color="white" fontSize="md">
              QTY
            </Text>
          </Box>

          <Input
            _focus={{
              bg: 'white',
            }}
            fontSize={'md'}
            bg="white"
            flex="1"
            placeholder="QTY"
            value={qty.toString()}
            onChangeText={Text => setqty(Text)}
          />
        </HStack>
        <HStack
          px="5"
          space="4"
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Box flex="0.4">
            <Text color="white" fontSize="md">
              Total
            </Text>
          </Box>

          <Box bg="blueGray.300" flex={1} p={3} rounded="md">
            <Text fontSize="md">
              Rp {formattedCurrency(product.price * qty)}
            </Text>
          </Box>
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
        bg={SECONDARY.GREEN}
        colorScheme="orange"
        onPress={() => handlePay()}>
        <Text fontSize="md" color="white" fontWeight={'semibold'}>
          Pay
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
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <FlatList
            contentContainerStyle={{
              padding: 10,
            }}
            data={actionData === 'Customer' ? dataCustomer : dataProduct}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            onEndReached={
              actionData === 'Customer' ? fetchData : fetchDataProduct
            }
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default DetailOrder;
