import axios from 'axios';
const API_URL = "https://todoo.5xcamp.us/users";

// 使用者登入
export const signIn = ( data ) => {
  return axios({
    headers: { 
      Accept: 'application/json',
      'Content-Type': 'application/json', 
    },
    method: 'post',
    url: API_URL + "/sign_in",
    data: data
  });
}

// 使用者登出
export const signOut = ( data ) => {
  return axios({
    headers: { Authorization: localStorage.getItem('token') },
    method: 'delete',
    url: API_URL + "/sign_out",
  });
}

// 使用者註冊
export const users = ( data ) => {
  return axios({
    method: 'post',
    url: API_URL,
    data: data
  });
}