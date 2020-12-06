import {
  FETCH_VENDOR_TRANSACTIONS,
  FETCH_VENDOR_TRANSACTIONS_SUCCESS,
  SET_NUM_ROWS_VENDOR_TRANSACTIONS,
  SET_DATE_RANGE_VENDOR_TRANSACTIONS,
} from '../constants';
import APICaller from '../../utils/APICaller';
import * as Storage from '../../utils/AsyncStorage';

export const actionForFetchVendorTransactions = () => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: FETCH_VENDOR_TRANSACTIONS,
  });
  try {
    const {grooveSellVendorTransactions} = getState();
    const {rows, currentDateRangeSelected} = grooveSellVendorTransactions;
    const [fromDate, toDate] = currentDateRangeSelected.split('-');
    const url = `groovesell/transactions?page=1&limit=${rows}&transactions[0]=0&advancedTransactions=0&search=&excludeFreeTransactions=false&affiliates[0][id]=0&affiliates[0][name]=All&fromDate=${fromDate}&toDate=${toDate}`;
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
        actionForFetchVendorTransactionsSuccess(response.data.data || []),
      );
  } catch (error) {
    console.log('actionForFetchVendorTransactions error --------', error);
  }
};

export const actionForFetchVendorTransactionsSuccess = (data) => ({
  type: FETCH_VENDOR_TRANSACTIONS_SUCCESS,
  payload: data,
});

export const actionForSetCurrentDateRange = (dateRange) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: SET_DATE_RANGE_VENDOR_TRANSACTIONS,
    payload: dateRange,
  });
  try {
    dispatch(actionForFetchVendorTransactions());
  } catch (error) {
    console.log('actionForSetCurrentDateRange error ---------', error);
  }
};

export const actionForSetNumRows = (rows) => async (dispatch, getState) => {
  dispatch({
    type: SET_NUM_ROWS_VENDOR_TRANSACTIONS,
    payload: rows,
  });
  try {
    dispatch(actionForFetchVendorTransactions());
  } catch (error) {
    console.log('actionForSetNumRows error ------------', error);
  }
};
