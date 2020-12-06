import {
  SET_GROOVE_SELL_AFFILIATE_CURRENT_DATE_RANGE,
  SET_GROOVE_SELL_AFFILIATE_CURRENT_TAB_SELECTED,
  SET_GROOVE_SELL_AFFILIATE_SET_BOOL_REVENUE_VIEW,
  SET_GROOVE_SELL_AFFILIATE_SET_CURRENT_CHART_VALUE,
  FETCH_GROOVE_SELL_AFFILIATE_DATA_SUCCESS,
  FETCH_GROOVE_SELL_AFFILIATE_DATA,
} from '../constants';
import moment from 'moment';

const initialState = {
  currentDateRangeSelected: `${moment().format('MM/DD/YYYY')}-${moment().format(
    'MM/DD/YYYY',
  )}`,
  currentTabSelected: 'total',
  revenueView: false,
  curr_chart_value: 'revenue',
  data: {},
  loading: false,
};

export default function GrooveFunnelAffiliateReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_GROOVE_SELL_AFFILIATE_DATA_SUCCESS:
      return {...state, data: action.payload, loading: false};
    case FETCH_GROOVE_SELL_AFFILIATE_DATA:
      return {...state, loading: true};
    case SET_GROOVE_SELL_AFFILIATE_CURRENT_DATE_RANGE:
      return {...state, currentDateRangeSelected: action.payload};
    case SET_GROOVE_SELL_AFFILIATE_CURRENT_TAB_SELECTED:
      return {...state, currentTabSelected: action.payload};
    case SET_GROOVE_SELL_AFFILIATE_SET_BOOL_REVENUE_VIEW:
      return {...state, revenueView: action.payload};
    case SET_GROOVE_SELL_AFFILIATE_SET_CURRENT_CHART_VALUE:
      return {...state, curr_chart_value: action.payload};
    default:
      return {...state};
  }
}
