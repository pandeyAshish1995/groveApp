import {
  FETCH_AFFILIATE_TRANSACTIONS,
  FETCH_AFFILIATE_TRANSACTIONS_SUCCESS,
  SET_NUM_ROWS_AFFILIATE_TRANSACTIONS,
  SET_DATE_RANGE_AFFILIATE_TRANSACTIONS,
} from '../constants';
import APICaller from '../../utils/APICaller';
import * as Storage from '../../utils/AsyncStorage';

export const actionForFetchAffiliateTransactions = () => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: FETCH_AFFILIATE_TRANSACTIONS,
  });
  try {
    const {grooveSellAffiliateTransactions} = getState();
    const {rows, currentDateRangeSelected} = grooveSellAffiliateTransactions;
    const [fromDate, toDate] = currentDateRangeSelected.split('-');
    const url = `groovesell/affiliate-transactions?page=1&limit=${rows}&transactions[0]=0&advancedTransactions=0&search=&excludeFreeTransactions=false&affiliates[0][id]=0&affiliates[0][name]=All&fromDate=${fromDate}&toDate=${toDate}`;
    const user = await Storage.get('user');
    const token = user && user.token;
    const response = await APICaller({
      url,
      method: 'get',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('Action response -------', response?.data?.data);
    response &&
      Array.isArray(response?.data?.data) &&
      dispatch(
        actionForFetchAffiliateTransactionsSuccess(response.data.data || []),
      );
  } catch (error) {
    console.log('actionForFetchAffiliateTransactions error --------', error);
  }
};

export const actionForFetchAffiliateTransactionsSuccess = (data) => ({
  type: FETCH_AFFILIATE_TRANSACTIONS_SUCCESS,
  payload: data,
});

export const actionForSetCurrentDateRange = (dateRange) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: SET_DATE_RANGE_AFFILIATE_TRANSACTIONS,
    payload: dateRange,
  });
  try {
    dispatch(actionForFetchAffiliateTransactions());
  } catch (error) {
    console.log('actionForSetCurrentDateRange error ---------', error);
  }
};

export const actionForSetNumRows = (rows) => async (dispatch, getState) => {
  dispatch({
    type: SET_NUM_ROWS_AFFILIATE_TRANSACTIONS,
    payload: rows,
  });
  try {
    dispatch(actionForFetchAffiliateTransactions());
  } catch (error) {
    console.log('actionForSetNumRows error ------------', error);
  }
};
