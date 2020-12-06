import axios from 'axios';
// import {API_BASE_URL} from '@env';
import * as Storage from '../utils/AsyncStorage';
import NavigationService from '../navigators/NavigationService';
let API_BASE_URL="jjjjjjj"
axios.interceptors.response.use(
  (response) => {
    // console.log('customAxiosInstance.interceptors.response', response);
    return response;
  },
  (error) => {
    let status = error.message;
    // console.log(status);
    status += '';
    status = status.toLowerCase();
    // console.log('customAxiosInstance.interceptors. >>>> error', error);
    if (
      status.includes('401') ||
      status.includes('402') ||
      status.includes('403')
    ) {
      Storage.remove('user');

      NavigationService.reset('InitialStack');
    }
    return error;
  },
);

export default async function APICaller({
  url,
  method = 'get',
  data = {},
  headers = {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
}) {
  try {
    const fullUrl = url;
    let options = {method, headers, url: fullUrl, data: {...data}};
    if (method === 'get' || method === 'GET') {
      delete options.data;
    }
  
    console.log('ApiCaller options', options);
    console.log('APICaller response -----', response);
    const response = await axios({...options});
    return response;
  } catch (error) {
    console.log('APICaller error >>>>>>>>', error);
    throw new Error(error);
  }
}
