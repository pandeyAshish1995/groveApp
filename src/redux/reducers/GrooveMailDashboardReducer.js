import {
  SET_GROOVE_MAIL_DASHBOARD_CURRENT_DATE_RANGE,
  GROOVE_MAIL_DASHBOARD_CURRENT_TAB_SELECTED,
  GROOVE_MAIL_DASHBOARD_FETCH_INITIAL_DATA,
  GROOVE_MAIL_DASHBOARD_FETCH_INITIAL_DATA_SUCCESS,
  GROOVE_MAIL_DASHBOARD_SET_CURRENT_CHART_VALUE,
} from '../constants';

import moment from 'moment';

const initialState = {
  currentDateRangeSelected: `${moment().format('MM/DD/YYYY')}-${moment().format(
    'MM/DD/YYYY',
  )}`,
  currentTabSelected: 'total',
  curr_chart_value: 'revenue',
  data: {},
  loading: false,
};

export default function GrooveMailDashboardReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case GROOVE_MAIL_DASHBOARD_FETCH_INITIAL_DATA_SUCCESS:
      return {...state, data: action.payload, loading: false};
    case GROOVE_MAIL_DASHBOARD_FETCH_INITIAL_DATA:
      return {...state, loading: true};
    case SET_GROOVE_MAIL_DASHBOARD_CURRENT_DATE_RANGE:
      return {...state, currentDateRangeSelected: action.payload};
    case GROOVE_MAIL_DASHBOARD_CURRENT_TAB_SELECTED:
      return {...state, currentTabSelected: action.payload};
    case GROOVE_MAIL_DASHBOARD_SET_CURRENT_CHART_VALUE:
      return {...state, curr_chart_value: action.payload};
    default:
      return {...state};
  }
}
