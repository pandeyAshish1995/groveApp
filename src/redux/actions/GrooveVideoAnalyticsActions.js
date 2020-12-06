import {
  GROOVE_VIDEO_ANALYTICS_SET_DATA,
  FETCH_GROOVE_VIDEO_ANALYTICS_DATA_START,
  FETCH_GROOVE_VIDEO_ANALYTICS_DATA_SUCCESS,
} from '../constants';
import * as Storage from '../../utils/AsyncStorage';
import APICaller from '../../utils/APICaller';

export const actionForFetchGrooveVideoAnalyticsData = () => async (
  dispatch,
  getState,
) => {
  dispatch({type: FETCH_GROOVE_VIDEO_ANALYTICS_DATA_START});
  try {
    const url = 'groovevideo/analytics';
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
    // console.log('RESPONSE DATA ANALYTICS', response);
    response &&
      Array.isArray(response?.data?.data) &&
      dispatch({
        type: FETCH_GROOVE_VIDEO_ANALYTICS_DATA_SUCCESS,
        payload: response.data.data,
      });
  } catch (error) {
    console.log('error ----------', error);
  }
};

export const actionForGrooveVideoAnalyticsSetData = (data) => ({
  type: GROOVE_VIDEO_ANALYTICS_SET_DATA,
  payload: data,
});
