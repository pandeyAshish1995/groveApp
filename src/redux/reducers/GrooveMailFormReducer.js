import {
  GROOVE_MAIL_FORMS_SET_DATA,
  FETCH_GROOVE_MAIL_FORMS_DATA_START,
  FETCH_GROOVE_MAIL_FORMS_DATA_SUCCESS,
} from '../constants';

const initialState = {
  data: [],
  loading: false,
};

export default function GrooveMailFormReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GROOVE_MAIL_FORMS_DATA_START:
      return {...state, loading: true};
    case FETCH_GROOVE_MAIL_FORMS_DATA_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case GROOVE_MAIL_FORMS_SET_DATA:
      return {...state, data: action.payload};
    default:
      return {...state};
  }
}
