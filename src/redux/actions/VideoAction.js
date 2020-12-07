import {REQUEST_POSTS, RECEIVE_POSTS } from '../constants';

export const requestVideo = () => ({
type: REQUEST_POSTS,
});
export const receivedVideo = json => ({
type: RECEIVE_POSTS,
data: json.videos,
});

export function fetchPosts() {
 return function (dispatch) {
   dispatch(requestVideo());
   return fetch("https://private-c31a5-task27.apiary-mock.com/videos")
   .then(
      response => response.json(),
      error => console.log('An error occurred.', error),
  )
   .then((json) => {
       console.log("json",json)
      dispatch(receivedVideo(json));
   },
  );
 };
}
