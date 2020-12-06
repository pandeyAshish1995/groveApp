import {
  SET_GROOVE_MAIL_DASHBOARD_CURRENT_DATE_RANGE,
  GROOVE_MAIL_DASHBOARD_CURRENT_TAB_SELECTED,
  GROOVE_MAIL_DASHBOARD_FETCH_INITIAL_DATA,
  GROOVE_MAIL_DASHBOARD_FETCH_INITIAL_DATA_SUCCESS,
  GROOVE_MAIL_DASHBOARD_SET_CURRENT_CHART_VALUE,
} from '../constants';
import moment from 'moment';
import * as Storage from '../../utils/AsyncStorage';
import APICaller from '../../utils/APICaller';

export const actionForSetCurrentDateRange = (rangeString) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: SET_GROOVE_MAIL_DASHBOARD_CURRENT_DATE_RANGE,
    payload: rangeString,
  });

  try {
    dispatch(actionForFetchInitialData());
  } catch (error) {
    console.log('error ---', error);
  }
};

export const actionForCurrentTabSelected = (tab) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: GROOVE_MAIL_DASHBOARD_CURRENT_TAB_SELECTED,
    payload: tab,
  });
  try {
    dispatch(actionForFetchInitialData());
  } catch (error) {
    console.log('error -----', error);
  }
};

export const actionForSetCurrentChartValue = (val) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: GROOVE_MAIL_DASHBOARD_SET_CURRENT_CHART_VALUE,
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
    const {grooveMailDashboard} = getState();
    const [
      fromDate,
      toDate,
    ] = grooveMailDashboard.currentDateRangeSelected.split('-');
    const data = {
      chart_value: grooveMailDashboard.curr_chart_value,
      diffDays: moment(toDate).diff(moment(fromDate), 'days'),
      fromDate,
      toDate,
      selected_tab: grooveMailDashboard.currentTabSelected,
    };
    let user = await Storage.get('user');
    const token = user && user.token;
    let response = await APICaller({
      url: 'groovemail/getDashboard',
      method: 'post',
      data,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(actionForFetchInitialDataSuccess({...response.data}));
  } catch (error) {
    console.log('error ------', error);
  }
};

export const actionForFetchInitialDataSuccess = (data) => ({
  type: GROOVE_MAIL_DASHBOARD_FETCH_INITIAL_DATA_SUCCESS,
  payload: data,
});

export const actionForloadingTrue = () => ({
  type: GROOVE_MAIL_DASHBOARD_FETCH_INITIAL_DATA,
});
