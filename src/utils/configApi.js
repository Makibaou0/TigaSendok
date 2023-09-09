import axios from 'axios';
import {getDataFromMMKV} from './configMMKV';

const baseUrlApi = 'https://test.goldenmom.id/api';

export const GetAllProduct = async key => {
  const url = `${baseUrlApi}/${key.key}`;
  const params = key.page;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${getDataFromMMKV('token')}`,
  };
  try {
    const response = await axios.get(
      `https://test.goldenmom.id/api/products?page=${params}`,
      {headers},
    );

    const data = response;
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};
export const GetAllCustomer = async key => {
  const params = key.page;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${getDataFromMMKV('token')}`,
  };
  try {
    const response = await axios.get(
      `https://test.goldenmom.id/api/customers?page=${params}`,
      {headers},
    );

    const data = response;
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

export const GetAllOrder = async key => {
  const params = key.page;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${getDataFromMMKV('token')}`,
  };
  try {
    const response = await axios.get(
      `https://test.goldenmom.id/api/orders?page=${params}&&status=unpaid`,
      {headers},
    );

    const data = response;
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

export const POSTAPI = async key => {
  const url = 'https://test.goldenmom.id/api/login';
  const params = key.params;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getDataFromMMKV('token')}`,
  };
  try {
    const response = await axios.post(url, params, {headers});
    const data = response.data;
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};

export const LOGINAPI = async key => {
  const url = `${baseUrlApi}/${key.key}`;
  const params = key.params;
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.post(url, params);
    const data = response.data;
    return {status: 'Success', data};
  } catch (error) {
    const data = error;
    return {status: 'Email/Password Salah!', data: 'Email/Password Salah!'};
  }
};
export const RegisterAPI = async key => {
  const url = `${baseUrlApi}/${key.key}`;
  const params = key.params;
  const headers = {
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.post(url, params);
    const data = response.data;
    return {status: 'Success', data};
  } catch (error) {
    const data = error;
    return {status: 'Email/Password Salah!', data: 'Email/Password Salah!'};
  }
};

export const AddCustomerApi = async key => {
  const url = `${baseUrlApi}/${key.key}`;
  const params = key.params;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',

    Authorization: `Bearer ${getDataFromMMKV('token')}`,
  };
  try {
    const response = await axios.post(url, params, {headers});
    const data = response.data;
    return {status: 'Success', data};
  } catch (error) {
    const data = error;
    return {status: 'Email/Password Salah!', data: 'Email/Password Salah!'};
  }
};
export const AddOrderApi = async key => {
  const url = `${baseUrlApi}/${key.key}`;
  const params = key.params;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',

    Authorization: `Bearer ${getDataFromMMKV('token')}`,
  };
  try {
    const response = await axios.post(url, params, {headers});
    const data = response.data;
    return {status: 'Success', data};
  } catch (error) {
    const data = error;
    return {status: 'Email/Password Salah!', data: 'Email/Password Salah!'};
  }
};
export const UpdateCustomerApi = async key => {
  const url = `${baseUrlApi}/${key.key}/${key.id}`;
  const params = key.params;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',

    Authorization: `Bearer ${getDataFromMMKV('token')}`,
  };
  try {
    const response = await axios.put(url, params, {headers});
    const data = response.data;
    return {status: 'Success', data};
  } catch (error) {
    const data = error;
    console.log(url);
    return {status: 'Email/Password Salah!', data: 'Email/Password Salah!'};
  }
};
export const UpdateOrderApi = async key => {
  const url = `${baseUrlApi}/${key.key}/${key.id}`;
  const params = key.params;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',

    Authorization: `Bearer ${getDataFromMMKV('token')}`,
  };
  try {
    const response = await axios.put(url, params, {headers});
    const data = response.data;
    return {status: 'Success', data};
  } catch (error) {
    const data = error;
    console.log(data);
    return {status: 'Email/Password Salah!', data: 'Email/Password Salah!'};
  }
};

export const DeleteCustomerApi = async key => {
  const url = `${baseUrlApi}/${key.key}/${key.id}`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',

    Authorization: `Bearer ${getDataFromMMKV('token')}`,
  };
  try {
    const response = await axios.delete(url, {headers});
    const data = response.data;
    return {status: 'Success', data};
  } catch (error) {
    const data = error;
    console.log(url);
    return {status: 'Email/Password Salah!', data: 'Email/Password Salah!'};
  }
};
export const DeleteOrderApi = async key => {
  const url = `${baseUrlApi}/${key.key}/${key.id}`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',

    Authorization: `Bearer ${getDataFromMMKV('token')}`,
  };
  try {
    const response = await axios.delete(url, {headers});
    const data = response.data;
    return {status: 'Success', data};
  } catch (error) {
    const data = error;
    console.log(url);
    return {status: 'Email/Password Salah!', data: 'Email/Password Salah!'};
  }
};
export const PayOrderApi = async key => {
  const url = `${baseUrlApi}/${key.key}/${key.id}/pay`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',

    Authorization: `Bearer ${getDataFromMMKV('token')}`,
  };
  try {
    const response = await axios.put(url, {headers});
    const data = response.data;
    return {status: 'Success', data};
  } catch (error) {
    const data = error;
    console.log(data);
    return {status: 'Email/Password Salah!', data: 'Email/Password Salah!'};
  }
};
