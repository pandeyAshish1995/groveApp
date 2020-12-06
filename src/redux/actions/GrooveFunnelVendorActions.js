import {
  SET_GROOVE_SELL_VENDOR_CURRENT_DATE_RANGE,
  CURRENT_TAB_SELECTED,
  SET_BOOL_REVENUE_VIEW,
  SET_CURRENT_CHART_VALUE,
  FETCH_INITIAL_DATA_SUCCESS,
  FETCH_INITIAL_DATA,
} from '../constants';
import APICaller from '../../utils/APICaller';
import * as Storage from '../../utils/AsyncStorage';
import moment from 'moment';

export const actionForSetCurrentDateRange = (rangeString) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: SET_GROOVE_SELL_VENDOR_CURRENT_DATE_RANGE,
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
    type: CURRENT_TAB_SELECTED,
    payload: tab,
  });
  try {
    dispatch(actionForFetchInitialData());
  } catch (error) {
    console.log('error -----', error);
  }
};

export const actionForSetBoolRevenueView = (bool) => {
  return {
    type: SET_BOOL_REVENUE_VIEW,
    payload: bool,
  };
};

export const actionForSetCurrentChartValue = (val) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: SET_CURRENT_CHART_VALUE,
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
    const {grooveSellVendor} = getState();
    const [fromDate, toDate] = grooveSellVendor.currentDateRangeSelected.split(
      '-',
    );
    // console.log('fromDate, toDate', fromDate, toDate);
    const data = {
      affiliates: [{id: 0, name: 'All'}],
      chart_value: grooveSellVendor.curr_chart_value,
      diffDays: moment(toDate).diff(moment(fromDate), 'days'),
      fromDate,
      toDate,
      funnels: [],
      selected_tab: grooveSellVendor.currentTabSelected,
    };
    let user = await Storage.get('user');
    const token = user && user.token;
    let response = await APICaller({
      url: 'groovesell/charts/get-vendor-report',
      method: 'post',
      data,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(actionForFetchInitialDataSuccess({...response}));
  } catch (error) {
    console.log('error ------', error);
  }
};

export const actionForFetchInitialDataSuccess = (data) => ({
  type: FETCH_INITIAL_DATA_SUCCESS,
  payload: data,
});

export const actionForloadingTrue = () => ({
  type: FETCH_INITIAL_DATA,
});
