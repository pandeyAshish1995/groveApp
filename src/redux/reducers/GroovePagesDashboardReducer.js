import {
  FETCH_GROOVE_PAGES_ANALYTICS_DATA,
  FETCH_GROOVE_PAGES_ANALYTICS_DATA_SUCCESS,
  SET_GROOVE_PAGES_CURRENT_DATE_RANGE,
} from '../constants';

import moment from 'moment';

const initialState = {
  loading: false,
  data: {},
  currentDateRangeSelected: `${moment().format('MM/DD/YYYY')}-${moment().format(
    'MM/DD/YYYY',
  )}`,
};

export default function GroovePagesDashboardReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_GROOVE_PAGES_ANALYTICS_DATA:
      return {...state, loading: true};
    case FETCH_GROOVE_PAGES_ANALYTICS_DATA_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case SET_GROOVE_PAGES_CURRENT_DATE_RANGE:
      return {...state, currentDateRangeSelected: action.payload};
    default:
      return {...state};
  }
}
