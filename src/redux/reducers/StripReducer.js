import {REQUEST_STRIPS, RECEIVE_STRIPS } from '../constants';


const initialState = {
    loading: false,
  };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STRIPS:
       return { ...state,stripData:[], loading: true };
    case RECEIVE_STRIPS:
       return { ...state, stripData: action.data, loading: false };
    default:
       return state;
  }
};
export default reducer;