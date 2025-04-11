import { apiRequest } from ".";


const BASE_URL = "http://localhost:5002/api";

export const CreateTask = async (task) =>
  apiRequest("post", "/api/tasks/create-task", task);

export const getAllTasks = async () =>
  apiRequest("get", `${BASE_URL}/task` );

export const getTaskById = async (id) =>
  apiRequest("get", `${BASE_URL}/task/${id}`);

export const deleteTask = async (id) =>
  apiRequest("delete", `${BASE_URL}/task/${id}`);

export const getTasksByProject = async (id) => {
  return apiRequest("get", `${BASE_URL}/task/project/${id}`);
};

export const updateTaskById = async (task, id) => {
  return apiRequest("patch", `${BASE_URL}/task/${id}`, task);
};
