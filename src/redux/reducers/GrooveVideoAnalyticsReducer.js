import {
  FETCH_GROOVE_VIDEO_ANALYTICS_DATA_START,
  FETCH_GROOVE_VIDEO_ANALYTICS_DATA_SUCCESS,
  GROOVE_VIDEO_ANALYTICS_SET_DATA,
} from '../constants';

const initialState = {
  data: [],
  loading: false,
};

export default function GrooveVideoAnalyticsReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_GROOVE_VIDEO_ANALYTICS_DATA_START:
      return {...state, loading: true};
    case FETCH_GROOVE_VIDEO_ANALYTICS_DATA_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case GROOVE_VIDEO_ANALYTICS_SET_DATA:
      return {...state, data: action.payload};
    default:
      return {...state};
  }
}
