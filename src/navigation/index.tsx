import {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import { ThemeProvider } from '@rneui/themed';

import {createTable} from '../services/database/DatabaseService';
import {navigationRef} from '../services/navigation/NavigationService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setScreenName, setUserData } from '../store/commonSlice';
import {AppScreenName, RootStackParamsList} from './types';
import {useDatabase} from '../context/DatabaseContext';
import {SCREEN_NAMES} from '../utils/NavigationUtils';
import Register from '../screens/Register/Register';
import { getData } from '../utils/DataUtils';
import Login from '../screens/Login/Login';
import { AsyncKeys } from '../utils/Keys';
import Home from '../screens/Home/Home';
import theme from '../assets/theme';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const Navigation = () => {
  const {screenName} = useAppSelector(state => state.commonReducer)

  const dispatch = useAppDispatch()
  const {db} = useDatabase();

  const loadData = useCallback(async () => {
    try {
      if (db) await createTable(db);
    } catch (error) {
      console.error(error);
    }
  }, [db]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getData(AsyncKeys.LOGIN);
        if(token){
          dispatch(setUserData({token}))
          dispatch(setScreenName(AppScreenName.Home))
        }
      } catch (error) {
        console.error("Error loading token:", error);
      } finally {
        setTimeout(()=>{
          SplashScreen.hide(); 
        },50)   
      }
    };

    checkToken();
  }, []);

  const renderAuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREEN_NAMES.Login} component={Login} />
        <Stack.Screen name={SCREEN_NAMES.Register} component={Register} />
      </Stack.Navigator>
    )
  }

  const renderHomeStack = () => {
    return(
      <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name={SCREEN_NAMES.Home} component={Home} />
      </Stack.Navigator>
    )
  }

  const getStack = () => {
    switch(screenName){
      case AppScreenName.Auth:
        return renderAuthStack()
      case AppScreenName.Home:
        return renderHomeStack() 
      default: 
        return renderAuthStack()
    }
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <ThemeProvider theme={theme}>{getStack()}</ThemeProvider>
    </NavigationContainer>
  );
};

export default Navigation;
