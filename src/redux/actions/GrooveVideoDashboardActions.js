import {
  SET_GROOVE_VIDEO_DASHBOARD_CURRENT_DATE_RANGE,
  GROOVE_VIDEO_DASHBOARD_SET_CURRENT_CHART_VALUE,
  GROOVE_VIDEO_DASHBOARD_FETCH_INITIAL_DATA_SUCCESS,
  GROOVE_VIDEO_DASHBOARD_FETCH_INITIAL_DATA,
} from '../constants';
import * as Storage from '../../utils/AsyncStorage';
import moment from 'moment';
import APICaller from '../../utils/APICaller';

export const actionForSetCurrentDateRange = (rangeString) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: SET_GROOVE_VIDEO_DASHBOARD_CURRENT_DATE_RANGE,
    payload: rangeString,
  });
  try {
    dispatch(actionForFetchInitialData());
  } catch (error) {
    console.log('error ---', error);
  }
};

export const actionForSetCurrentChartValue = (val) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: GROOVE_VIDEO_DASHBOARD_SET_CURRENT_CHART_VALUE,
    payload: val,
  });
  try {
    dispatch(actionForFetchInitialData());
  } catch (error) {
    console.log('error -------', error);
  }
};

export const actionForFetchInitialData = () => async (dispatch, getState) => {
  dispatch(actionForloadingTrue());
  try {
    const {grooveVideoDashboard} = getState();
    const [
      fromDate,
      toDate,
    ] = grooveVideoDashboard.currentDateRangeSelected.split('-');
    const data = {
      chart_value: grooveVideoDashboard.curr_chart_value,
      diffDays: moment(toDate).diff(moment(fromDate), 'days'),
      fromDate,
      toDate,
      videoid: '0',
    };
    let user = await Storage.get('user');
    const token = user && user.token;
    let response = await APICaller({
      url: 'groovevideo/charts/dashboard',
      method: 'post',
      data,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('Groove Video Data Dashboard >>>>>>', response);
    dispatch(actionForFetchInitialDataSuccess({...response.data}));
  } catch (error) {
    console.log('error ------', error);
  }
};

export const actionForFetchInitialDataSuccess = (data) => ({
  type: GROOVE_VIDEO_DASHBOARD_FETCH_INITIAL_DATA_SUCCESS,
  payload: data,
});

export const actionForloadingTrue = () => ({
  type: GROOVE_VIDEO_DASHBOARD_FETCH_INITIAL_DATA,
});
