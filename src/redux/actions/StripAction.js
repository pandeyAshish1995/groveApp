import {REQUEST_STRIPS, RECEIVE_STRIPS } from '../constants';

export const requestStrips = () => ({
type: REQUEST_STRIPS,
});
export const receivedStrips = json => ({
type: RECEIVE_STRIPS,
data: json,
});

export function fetchStrips() {
 return function (dispatch) {
   dispatch(requestStrips());
   return fetch("https://5f16ad48a346a0001673929b.mockapi.io/api/mockdata/chemicals")
   .then(
      response => response.json(),
      error => console.log('An error occurred.', error),
  )
   .then((json) => {
       console.log("json",json)
      dispatch(receivedStrips(json));
   },
  );
 };
}
