import {
  HANDLE_LOGIN_INPUT_CHANGE,
  SET_ERROR,
  LOGIN_SUCCESS,
  HANDLE_LOGIN_SUBMIT,
  ON_LOGIN_SCREEN_FOCUS,
} from '../constants';
import APICaller from '../../utils/APICaller';
import {emailValidator} from '../../utils/Validators';
import * as Storage from '../../utils/AsyncStorage';

export const actionForLoginInputChange = (name, value) => ({
  type: HANDLE_LOGIN_INPUT_CHANGE,
  payload: {name, value},
});

export const actionForLoginSubmit = () => async (dispatch, getState) => {
  dispatch(actionForOnLoginSubmit());
  try {
    const {email, password} = getState().login;
    // console.log('email, password', email, password);
    if (!email.length) {
      dispatch(actionForSetError('Email is required!'));
    } else if (!password.length) {
      dispatch(actionForSetError('Password is required!'));
    } else if (emailValidator(email)) {
      // console.log('actionForLoginSubmit 1111111111');
      let response = await APICaller({
        url: 'groovedigital/auth/login',
        method: 'post',
        data: {email, password},
        isFormData: true,
      });
      let {data} = response;
      // console.log('Login response Data >>>', data);
      await Storage.set('user', JSON.stringify(data));
      dispatch(actionForLoginSuccess());
    } else {
      dispatch(actionForSetError('Invalid Email Format!'));
    }
  } catch (error) {
    console.log('error -----', error);
    dispatch(actionForSetError('Invalid username or password'));
  }
};

export const actionForSetError = (err) => ({
  type: SET_ERROR,
  payload: err,
});

export const actionForLoginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const actionForOnLoginSubmit = () => ({
  type: HANDLE_LOGIN_SUBMIT,
});

export const actionForOnLoginScreenFocus = () => ({
  type: ON_LOGIN_SCREEN_FOCUS,
});
