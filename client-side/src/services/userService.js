import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const tokenKey = "token";

export function getJwt() {
  return localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function members(){
  return http.get(`${apiUrl}/users/get`)
}

export async function login(email, password) {
  const { data } = await http.post(`http://localhost:3900/api/auth`, { email, password })
  localStorage.setItem('token', data.token)
  if (data.token) window.location = "/";
  else toast('לא הצלחת להתחבר כראוי')
}

export default {
  login,
  getCurrentUser,
  logout,
  getJwt,
  members
};