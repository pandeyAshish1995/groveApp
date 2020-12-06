import {
  FETCH_VENDOR_TRANSACTIONS,
  FETCH_VENDOR_TRANSACTIONS_SUCCESS,
  SET_DATE_RANGE_VENDOR_TRANSACTIONS,
  SET_NUM_ROWS_VENDOR_TRANSACTIONS,
} from '../constants';
import moment from 'moment';

const initialState = {
  loading: false,
  data: [],
  rows: 10,
  currentDateRangeSelected: `${moment().format('MM/DD/YYYY')}-${moment().format(
    'MM/DD/YYYY',
  )}`,
};

export default function GrooveFunnelVendorTransactionsReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_VENDOR_TRANSACTIONS:
      return {...state, loading: true};
    case FETCH_VENDOR_TRANSACTIONS_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case SET_DATE_RANGE_VENDOR_TRANSACTIONS:
      return {...state, currentDateRangeSelected: action.payload};
    case SET_NUM_ROWS_VENDOR_TRANSACTIONS:
      return {...state, rows: action.payload};
    default:
      return {...state};
  }
}
