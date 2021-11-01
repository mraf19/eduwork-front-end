import axios from "axios"
import { config } from "../../config";

export const registerUser = async (data) => {
  return await axios.post(`${config.api_host}/auth/register`, data);
}

export const loginUser = async (data) => {
  return await axios.post(`${config.api_host}/auth/login`, data);
}

export const logoutUser = async () => {
  let {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

  return await axios.post(`${config.api_host}/auth/login`, null, {
    headers: {
      authorization: `Bearer ${token}`
    }
  }).then(res => {
    localStorage.removeItem('auth');
    return res
  });
}