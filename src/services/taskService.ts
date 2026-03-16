import axios from 'axios';
import type { Task } from "../types/task";

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = async () => {
  return api.get("/tasks"); 
};

export const createTask = (data: Partial<Task>) => api.post("/tasks", data);

export const updateTask = (id: number, data: Partial<Task>) => api.put(`/tasks/${id}`, data);

export const deleteTask = async (taskId: number) => {
  return api.delete(`/tasks/${taskId}`);
};

export const deleteAdminTask = async (taskId: number) => {
  const response = await api.delete(`/admin/tasks/${taskId}`);
  return response.data;
};

export const getAllUsers = async () => {
    return api.get('/admin/users'); 
};
