import {View, Text, LogBox} from 'react-native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NativeBaseProvider, StatusBar, extendTheme} from 'native-base';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Welcome from './src/screens/Welcome';
import Register from './src/screens/Register';
import Customer from './src/screens/Customer';
import Order from './src/screens/Order';
import AddCustomer from './src/screens/AddCustomer';
import DetailCustomer from './src/screens/DetailCustomer';
import DetailOrder from './src/screens/DetailOrder';
import AddOrder from './src/screens/AddOrder';

const theme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      200: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      300: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      400: {
        normal: 'Poppins-Regular',
        italic: 'Poppins-Italic',
      },
      500: {
        normal: 'Poppins-Medium',
      },
      600: {
        normal: 'Poppins-Medium',
        italic: 'Poppins-MediumItalic',
      },

      700: {
        normal: 'Poppins-Bold',
      },
      800: {
        normal: 'Poppins-Bold',
        italic: 'Poppins-BoldItalic',
      },
      900: {
        normal: 'Poppins-Bold',
        italic: 'Poppins-BoldItalic',
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
});
const Stack = createNativeStackNavigator();
const SplashScreen = route => {
  return <Splash route={route} />;
};
const HomeScreen = route => {
  return <Home route={route} />;
};
const RegisterScreen = route => {
  return <Register route={route} />;
};
const LoginScreen = route => {
  return <Login route={route} />;
};
const WelcomeScreen = route => {
  return <Welcome route={route} />;
};
const CustomerScreen = route => {
  return <Customer route={route} />;
};
const OrderScreen = route => {
  return <Order route={route} />;
};
const AddCustomerScreen = route => {
  return <AddCustomer route={route} />;
};
const DetailCustomerScreen = route => {
  return <DetailCustomer route={route} />;
};
const DetailOrderScreen = route => {
  return <DetailOrder route={route} />;
};
const AddOrderScreen = route => {
  return <AddOrder route={route} />;
};
const App = () => {
  LogBox.ignoreLogs([
    'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
  ]);
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <StatusBar barStyle={'light-content'} />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Customer" component={CustomerScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
            <Stack.Screen name="AddOrder" component={AddOrderScreen} />
            <Stack.Screen
              name="DetailCustomer"
              component={DetailCustomerScreen}
            />
            <Stack.Screen name="DetailOrder" component={DetailOrderScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
