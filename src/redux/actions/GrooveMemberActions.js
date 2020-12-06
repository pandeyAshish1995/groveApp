import {
  FETCH_GROOVE_MEMBER_ANALYTICS_DATA,
  FETCH_GROOVE_MEMBER_ANALYTICS_DATA_SUCCESS,
  SET_GROOVE_MEMBER_CURRENT_DATE_RANGE,
} from '../constants';
import * as Storage from '../../utils/AsyncStorage';
import APICaller from '../../utils/APICaller';
import moment from 'moment';

export const actionForSetDateRange = (dateRange) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: SET_GROOVE_MEMBER_CURRENT_DATE_RANGE,
    payload: dateRange,
  });
  try {
    dispatch(actionForFetchDataGrooveMember());
  } catch (error) {
    console.log('error ---------', error);
  }
};

export const actionForFetchDataGrooveMember = () => async (
  dispatch,
  getState,
) => {
  dispatch({type: FETCH_GROOVE_MEMBER_ANALYTICS_DATA});
  try {
    const {currentDateRange} = getState().grooveMember;
    const user = await Storage.get('user');
    const token = user && user.token;
    const [start, end] = currentDateRange.split('-');
    let response = await APICaller({
      url: 'groovemember/charts/get-members-report',
      method: 'POST',
      data: {
        chart_value: 'total_members',
        diffDays: moment(end).diff(moment(start), 'days'),
        membership: 0,
        fromDate: start,
        toDate: end,
      },
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    response &&
      response.data &&
      dispatch({
        type: FETCH_GROOVE_MEMBER_ANALYTICS_DATA_SUCCESS,
        payload: response?.data,
      });
  } catch (error) {
    console.log('error -----------------', error);
  }
};
