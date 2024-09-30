import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const storeToken = async (token) => {
    if (Platform.OS === 'web') {
        localStorage.setItem('jwtToken', token);
    } else {
        await SecureStore.setItemAsync('jwtToken', token);
    }
};

export const retrieveToken = async () => {
    if (Platform.OS === 'web') {
        return localStorage.getItem('jwtToken');
    } else {
        return await SecureStore.getItemAsync('jwtToken');
    }
};

export const deleteToken = async () => {
    if (Platform.OS === 'web') {
        return localStorage.removeItem('jwtToken');
    } else {
        return await SecureStore.deleteItemAsync('jwtToken');
    }
};