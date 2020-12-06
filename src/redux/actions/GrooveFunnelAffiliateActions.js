import {
  SET_GROOVE_SELL_AFFILIATE_CURRENT_DATE_RANGE,
  SET_GROOVE_SELL_AFFILIATE_CURRENT_TAB_SELECTED,
  SET_GROOVE_SELL_AFFILIATE_SET_BOOL_REVENUE_VIEW,
  SET_GROOVE_SELL_AFFILIATE_SET_CURRENT_CHART_VALUE,
  FETCH_GROOVE_SELL_AFFILIATE_DATA,
  FETCH_GROOVE_SELL_AFFILIATE_DATA_SUCCESS,
} from '../constants';
import APICaller from '../../utils/APICaller';
import * as Storage from '../../utils/AsyncStorage';
import moment from 'moment';

export const actionForSetCurrentDateRange = (rangeString) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: SET_GROOVE_SELL_AFFILIATE_CURRENT_DATE_RANGE,
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
    type: SET_GROOVE_SELL_AFFILIATE_CURRENT_TAB_SELECTED,
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
    type: SET_GROOVE_SELL_AFFILIATE_SET_BOOL_REVENUE_VIEW,
    payload: bool,
  };
};

export const actionForSetCurrentChartValue = (val) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: SET_GROOVE_SELL_AFFILIATE_SET_CURRENT_CHART_VALUE,
    payload: val,
  });
  try {
    dispatch(actionForFetchInitialData());
  } catch (error) {
    console.log('error -------', error);
  }
};

export const actionForFetchInitialData = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_GROOVE_SELL_AFFILIATE_DATA,
  });
  try {
    const {grooveSellAffiliate} = getState();
    const [
      fromDate,
      toDate,
    ] = grooveSellAffiliate.currentDateRangeSelected.split('-');
    const data = {
      affiliates: [{id: 0, name: 'All'}],
      chart_value: grooveSellAffiliate.curr_chart_value,
      diffDays: moment(toDate).diff(moment(fromDate), 'days'),
      fromDate,
      toDate,
      funnels: [],
      selected_tab: grooveSellAffiliate.currentTabSelected,
    };
    let user = await Storage.get('user');
    const token = user && user.token;
    let response = await APICaller({
      url: 'groovesell/charts/get-affiliate-report',
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
  type: FETCH_GROOVE_SELL_AFFILIATE_DATA_SUCCESS,
  payload: data,
});
