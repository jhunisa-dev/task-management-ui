import api from "../api/axios";
import type { User } from "../types/user";

export const getAllUsers = () => {
  return api.get<User[]>("/admin/users"); // Remove /api if your base URL already has it
};

export const deleteUser = (id: number) => {
  return api.delete(`/admin/users/${id}`);
};

export const createUser = (userData: any) => {
  return api.post("/admin/users", userData);
};