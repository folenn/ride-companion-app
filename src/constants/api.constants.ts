import {Platform} from 'react-native';

export const API_BASE = Platform.OS === 'android' ? 'http://192.168.1.71:3000/api' : 'http://192.168.1.71:3000/api';
