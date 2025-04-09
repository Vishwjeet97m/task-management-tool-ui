import { apiRequest } from ".";


const BASE_URL = "http://localhost:5003/api"

export const CreateProject = async (project) => apiRequest("post",`${BASE_URL}/project`, project);

export const getAllProjects = async () => apiRequest("get", `${BASE_URL}/project`);

export const GetProjectById = async (id) => apiRequest("post", "/api/projects/get-project-by-id", { _id: id });

export const editProject = async (project, id) => apiRequest("patch", `${BASE_URL}/project/${id}`, project);

export const deleteProject = async (id) => apiRequest("delete", `${BASE_URL}/project/${id}`);
