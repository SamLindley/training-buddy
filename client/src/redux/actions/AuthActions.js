import axios from 'axios';
import * as types from '../types';

export const loginViaFacebook = response => async dispatch => {
  console.log(response);

  const res = await axios.post("http://localhost:3030/users/oauth/facebook", {access_token: response.accessToken});
  if (res.status === 200) {
    dispatch({type: types.LOGIN_SUCCESS, payload: {userName: res.data.userName}})
  } else {
    dispatch({type: types.FACEBOOK_LOGIN_FAILURE, payload: res})
  }
};

export const loginViaGoogle = response => async dispatch => {
  console.log(response);

  const res = await axios.post("http://localhost:3030/users/oauth/google", {access_token: response.accessToken});

  console.log(res);
  if (res.status === 200) {
    dispatch({type: types.LOGIN_SUCCESS, payload: {userName: res.data.userName}})
  } else {
    dispatch({type: types.GOOGLE_LOGIN_FAILURE, payload: res})
  }

};

export const loginViaLocal = (email, password) => async dispatch => {
  console.log(email, password);
};