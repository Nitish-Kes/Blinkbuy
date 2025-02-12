import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import bcrypt from 'react-native-bcrypt';
import {v4 as uuidv4} from 'uuid';

export const generateLoginToken = () => {
  return uuidv4();
};

export const getStoredObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
  }
};

export const setStoredObject = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error in saving ' + key);
  }
};

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error storing data:', e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error('Error retriving data:', e);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data:', e);
  }
};

export const hashedPassword = (
  password: string,
  saltRounds: number = 10,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

export const comparePassword = async (
  inputPassword: string,
  storedHash: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(inputPassword, storedHash, (err, result) => {
      if (err) {
        reject(err); 
      } else {
        resolve(result); 
      }
    });
  });
};
