import { apiRequest } from ".";
const BASE_URL = "http://localhost:5001/api"
export const RegisterUser = async (payload) => apiRequest('post', '/api/users/register', payload);
export const LoginUser = async (payload) => apiRequest('post', '/api/users/login', payload);
export const GetLoggedInUser = async () => apiRequest('get', '/api/users/get-logged-in-user');
export const GetAllUsers = async () => apiRequest('get', `${BASE_URL}/user`);
export const deleteUser = async (id) => apiRequest('delete', `${BASE_URL}/user/${id}`);
export const editUser = async(user, id) => apiRequest('patch',`${BASE_URL}/user/${id}`, user)
export const addUser = async(user) => apiRequest('post',`${BASE_URL}/auth/register`, user)