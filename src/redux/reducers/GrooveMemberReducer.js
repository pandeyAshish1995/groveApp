import {
  FETCH_GROOVE_MEMBER_ANALYTICS_DATA,
  FETCH_GROOVE_MEMBER_ANALYTICS_DATA_SUCCESS,
  SET_GROOVE_MEMBER_CURRENT_DATE_RANGE,
} from '../constants';

import moment from 'moment';

const initialState = {
  loading: false,
  currentDateRange: `${moment().format('MM/DD/YYYY')}-${moment().format(
    'MM/DD/YYYY',
  )}`,
  data: {},
};

export default function GrooveMemberReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GROOVE_MEMBER_CURRENT_DATE_RANGE:
      return {...state, currentDateRange: action.payload};
    case FETCH_GROOVE_MEMBER_ANALYTICS_DATA:
      return {...state, loading: true};
    case FETCH_GROOVE_MEMBER_ANALYTICS_DATA_SUCCESS:
      return {...state, loading: false, data: action.payload};
    default:
      return {...state};
  }
}
