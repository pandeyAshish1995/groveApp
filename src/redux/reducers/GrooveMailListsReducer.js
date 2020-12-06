import {
  FETCH_GROOVE_MAIL_LIST_DATA_SUCCESS,
  FETCH_GROOVE_MAIL_LIST_DATA_START,
  GROOVE_MAIL_SET_DATA,
} from '../constants';

const initialState = {
  lists: [],
  loading: false,
};

export default function GrooveMailListsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GROOVE_MAIL_LIST_DATA_START:
      return {...state, loading: true};
    case FETCH_GROOVE_MAIL_LIST_DATA_SUCCESS:
      return {...state, loading: false, lists: action.payload};
    case GROOVE_MAIL_SET_DATA:
      return {...state, lists: action.payload};
    default:
      return {...state};
  }
}
