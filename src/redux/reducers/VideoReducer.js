import {REQUEST_POSTS, RECEIVE_POSTS } from '../constants';

const initialState = {
    loading: false,
  };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
       return { ...state,videoData:[], loading: true };
    case RECEIVE_POSTS:
       return { ...state, videoData: action.data, loading: false };
    default:
       return state;
  }
};
export default reducer;