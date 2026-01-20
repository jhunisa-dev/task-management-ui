import api from "../api/axios";
import type { Task } from "../types/task";

export const getTasks = () => api.get("/tasks");

export const createTask = (data: Partial<Task>) => api.post("/tasks", data);

export const updateTask = (id: number, data: Partial<Task>) => api.put(`/tasks/${id}`, data);

export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);
