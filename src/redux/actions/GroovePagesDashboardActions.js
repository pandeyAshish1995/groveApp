import {
  FETCH_GROOVE_PAGES_ANALYTICS_DATA,
  FETCH_GROOVE_PAGES_ANALYTICS_DATA_SUCCESS,
  SET_GROOVE_PAGES_CURRENT_DATE_RANGE,
} from '../constants';
import APICaller from '../../utils/APICaller';
import * as Storage from '../../utils/AsyncStorage';
import moment from 'moment';

export const actionForSetDateRange = (dateRange) => async (
  dispatch,
  getState,
) => {
  dispatch({type: SET_GROOVE_PAGES_CURRENT_DATE_RANGE, payload: dateRange});
  try {
    dispatch(actionForFetchGroovePagesDetails());
  } catch (error) {
    console.log('error ------------------', error);
  }
};

export const actionForFetchGroovePagesDetails = () => async (
  dispatch,
  getState,
) => {
  let addUrl;
  dispatch({type: FETCH_GROOVE_PAGES_ANALYTICS_DATA});
  try {
    const state = getState().groovePagesDashboard;
    const {currentDateRangeSelected} = state;
    const user = await Storage.get('user');
    const token = user && user.token;
    const [start, end] = currentDateRangeSelected.split('-');
    const diff = moment(end).diff(moment(start), 'days');
    if (diff === 0) {
      addUrl = 'day/1';
    } else if (diff === 7) {
      addUrl = 'week/1';
    } else if (diff === 14) {
      addUrl = 'week/2';
    } else {
      addUrl = 'month/1';
    }
    const response = await APICaller({
      url: `groovepages/sites/analytics/recent-site/${addUrl}`,
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    response &&
      response?.data &&
      dispatch({
        type: FETCH_GROOVE_PAGES_ANALYTICS_DATA_SUCCESS,
        payload: response?.data,
      });
  } catch (error) {
    console.log('error -------------', error);
  }
};
