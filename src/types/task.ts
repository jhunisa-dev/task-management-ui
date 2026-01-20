// export interface Task {
//   id: number;
//   title: string;
//   description?: string;
//   status: "TODO" | "IN_PROGRESS" | "DONE";
//   priority?: "High" | "Medium" | "Low"; // Add this
//   deadline?: string;                  // Add this
//   createdAt: string;
//   updatedAt: string;
// }

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority?: string;
  dueDate?: string; // Change 'deadline' to 'dueDate' if that's what the API sends
  createdAt: string;
  updatedAt: string;
}