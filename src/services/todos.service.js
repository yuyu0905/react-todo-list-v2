import axios from 'axios';
const API_URL = "https://todoo.5xcamp.us/todos";

// TODO列表
export const todos = ( ) => {
  return axios({
    headers: { Authorization: localStorage.getItem('token') },
    method: 'get',
    url: API_URL,
  });
}

// 新增TODO列表
export const addTodo = ( data ) => {
  return axios({
    headers: { Authorization: localStorage.getItem('token') },
    method: 'post',
    url: API_URL,
    data: data,
  });
}

// TODO完成/已完成切換
export const toggleTodo = ( id ) => {
  return axios({
    headers: { Authorization: localStorage.getItem('token') },
    method: 'patch',
    url: API_URL + `/${id}/toggle`,
  });
}

// TODO刪除
export const deleteTodo = ( id ) => {
  return axios({
    headers: { Authorization: localStorage.getItem('token') },
    method: 'delete',
    url: API_URL + `/${id}`,
  });
}