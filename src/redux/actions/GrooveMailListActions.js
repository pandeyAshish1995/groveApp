import {
  FETCH_GROOVE_MAIL_LIST_DATA_START,
  FETCH_GROOVE_MAIL_LIST_DATA_SUCCESS,
  GROOVE_MAIL_SET_DATA,
} from '../constants';
import * as Storage from '../../utils/AsyncStorage';
import APICaller from '../../utils/APICaller';

export const actionForFetchGrooveMailListData = () => async (
  dispatch,
  getState,
) => {
  dispatch({type: FETCH_GROOVE_MAIL_LIST_DATA_START});
  try {
    const url = 'groovemail/maillist';
    const user = await Storage.get('user');
    const token = user && user.token;
    const response = await APICaller({
      url,
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    response &&
      Array.isArray(response?.data) &&
      dispatch({
        type: FETCH_GROOVE_MAIL_LIST_DATA_SUCCESS,
        payload: response.data,
      });
  } catch (error) {
    console.log('error ----------', error);
  }
};

export const actionForGrooveMailSetData = (data) => ({
  type: GROOVE_MAIL_SET_DATA,
  payload: data,
});
