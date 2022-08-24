import axios from 'axios';
const API_URL = "https://todoo.5xcamp.us";

// 登入權限測試
export const check = () => {
  return axios({
    headers: { Authorization: localStorage.getItem('token') },
    method: 'get',
    url: API_URL,
  });
}
