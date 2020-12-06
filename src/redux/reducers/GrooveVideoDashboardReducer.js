import {
  SET_GROOVE_VIDEO_DASHBOARD_CURRENT_DATE_RANGE,
  GROOVE_VIDEO_DASHBOARD_SET_CURRENT_CHART_VALUE,
  GROOVE_VIDEO_DASHBOARD_FETCH_INITIAL_DATA_SUCCESS,
  GROOVE_VIDEO_DASHBOARD_FETCH_INITIAL_DATA,
} from '../constants';

import moment from 'moment';

const initialState = {
  currentDateRangeSelected: `${moment().format('MM/DD/YYYY')}-${moment().format(
    'MM/DD/YYYY',
  )}`,
  curr_chart_value: 'plays',
  data: {},
  loading: false,
};

export default function GrooveVideoDashboardReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case SET_GROOVE_VIDEO_DASHBOARD_CURRENT_DATE_RANGE:
      return {...state, currentDateRangeSelected: action.payload};
    case GROOVE_VIDEO_DASHBOARD_SET_CURRENT_CHART_VALUE:
      return {...state, curr_chart_value: action.payload};
    case GROOVE_VIDEO_DASHBOARD_FETCH_INITIAL_DATA:
      return {...state, loading: true};
    case GROOVE_VIDEO_DASHBOARD_FETCH_INITIAL_DATA_SUCCESS:
      return {...state, loading: false, data: action.payload};
    default:
      return {...state};
  }
}
