import {
  HANDLE_LOGIN_INPUT_CHANGE,
  SET_ERROR,
  LOGIN_SUCCESS,
  HANDLE_LOGIN_SUBMIT,
  ON_LOGIN_SCREEN_FOCUS,
} from '../constants';

const initialState = {
  email: '',
  password: '',
  error: '',
  isLoggedIn: false,
  loading: false,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_LOGIN_INPUT_CHANGE:
      return {...state, [action.payload.name]: action.payload.value};
    case SET_ERROR:
      return {...state, error: action.payload, loading: false};
    case LOGIN_SUCCESS:
      // console.log('Login Success >>>>>>');
      return {...state, isLoggedIn: true, loading: false};
    case HANDLE_LOGIN_SUBMIT:
      return {...state, loading: true};
    case ON_LOGIN_SCREEN_FOCUS:
      return {...initialState};
    default:
      return {...state};
  }
};

export default LoginReducer;
