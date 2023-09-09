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
} from 'native-base';
import {PRIMARY} from '../utils/colors';
import {inset} from '../utils/size';
import {GetAllOrder, GetAllProduct} from '../utils/configApi';
import moment from 'moment'; // Impor moment
import {formattedCurrency} from '../utils/formatCurrency';
import {formatDate} from '../utils/formatDate';

const Order = route => {
  const Navigation = route.route.navigation;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!hasMoreData || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await GetAllOrder({
        page: currentPage,
        filter: {
          paid: false, // Ganti sesuai dengan filter yang sesuai dengan API Anda
        },
      });

      const newData = response.data.data;

      if (newData.length > 0) {
        // Ada data baru, tambahkan ke data yang ada
        setData([...data, ...newData]);
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

  const renderItem = ({item}) => (
    <Pressable onPress={() => Navigation.navigate('DetailOrder', item)}>
      <VStack mb="4" bg="white" p="4" rounded="lg" alignItems={'center'}>
        <Text fontSize="md">Order #{item.id}</Text>
        <Text fontSize="md">{formatDate(item.created_at)}</Text>
        <Text fontSize="md">
          {item.customer.name} - Rp. {formattedCurrency(item.total)}
        </Text>
      </VStack>
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
        mt={inset().top}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <Pressable
          alignItems={'center'}
          justifyContent={'center'}
          onPress={() => Navigation.navigate('Home')}>
          <HStack alignItems={'center'} space="2">
            <ChevronLeftIcon size={6} color="white" />
            <Text color="white" fontSize="md">
              Back
            </Text>
          </HStack>
        </Pressable>
        <Text fontSize="xl" color="white" fontWeight={'semibold'}>
          Order
        </Text>
        <Pressable
          alignItems={'center'}
          justifyContent={'center'}
          onPress={() => Navigation.navigate('AddOrder')}>
          <HStack alignItems={'center'} space="2">
            <AddIcon size={6} color={'white'} />
            <Text color={'white'} fontSize="md">
              New
            </Text>
          </HStack>
        </Pressable>
      </HStack>

      <FlatList
        contentContainerStyle={{
          padding: 10,
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </Box>
  );
};

export default Order;
