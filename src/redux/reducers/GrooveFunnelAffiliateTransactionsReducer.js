import {
  FETCH_AFFILIATE_TRANSACTIONS,
  FETCH_AFFILIATE_TRANSACTIONS_SUCCESS,
  SET_DATE_RANGE_AFFILIATE_TRANSACTIONS,
  SET_NUM_ROWS_AFFILIATE_TRANSACTIONS,
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

export default function GrooveFunnelAffiliateTransactionsReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_AFFILIATE_TRANSACTIONS:
      return {...state, loading: true};
    case FETCH_AFFILIATE_TRANSACTIONS_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case SET_DATE_RANGE_AFFILIATE_TRANSACTIONS:
      return {...state, currentDateRangeSelected: action.payload};
    case SET_NUM_ROWS_AFFILIATE_TRANSACTIONS:
      return {...state, rows: action.payload};
    default:
      return {...state};
  }
}
