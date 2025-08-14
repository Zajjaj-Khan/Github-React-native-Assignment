import axios from 'axios';

const API_BASE = 'https://api.github.com';

export const searchUsers = async (query:string) => {
  const res = await axios.get(`${API_BASE}/search/users?q=${query}`);
  return res.data;
};

export const getUserDetails = async (username:string) => {
  const res = await axios.get(`${API_BASE}/users/${username}`);
  return res.data;
};
