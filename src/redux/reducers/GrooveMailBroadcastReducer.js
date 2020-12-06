import {
  FETCH_GROOVE_MAIL_BROADCAST_DATA_START,
  FETCH_GROOVE_MAIL_BROADCAST_DATA_SUCCESS,
  GROOVE_MAIL_BROADCAST_SET_DATA,
  GROOVE_MAIL_STOP_CAMPAIGN_BROADCAST_SUCCESS,
  GROOVE_MAIL_STOP_CAMPAIGN_BROADCAST,
  GROOVE_MAIL_SEND_NOW_BROADCAST,
  GROOVE_MAIL_SEND_NOW_BROADCAST_SUCCESS,
} from '../constants';

const initialState = {
  data: [],
  loading: false,
};

export default function GrooveMailBroadcastReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case FETCH_GROOVE_MAIL_BROADCAST_DATA_START:
      return {...state, loading: true};
    case FETCH_GROOVE_MAIL_BROADCAST_DATA_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case GROOVE_MAIL_BROADCAST_SET_DATA:
      return {...state, data: action.payload};
    case GROOVE_MAIL_STOP_CAMPAIGN_BROADCAST:
      return {...state, loading: true};
    case GROOVE_MAIL_STOP_CAMPAIGN_BROADCAST_SUCCESS:
      return {...state, loading: false};
    case GROOVE_MAIL_SEND_NOW_BROADCAST:
      return {...state, loading: true};
    case GROOVE_MAIL_SEND_NOW_BROADCAST_SUCCESS:
      return {...state, loading: false};
    default:
      return {...state};
  }
}
