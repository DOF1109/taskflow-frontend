export interface Project {
  name: string;
  description?: string;
  id: number;
  owner_id: number;
}
export interface ProjectCreate {
  name: string;
  description?: string;
}
export interface ProjectUpdate {
  name: string;
  description?: string;
}
export interface Tag {
  name: string;
  id: number;
}
export interface Task {
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  due_date?: string;
  tags: Tag[];
  id: number;
  owner_id: number;
}
export interface TaskCreate {
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  due_date?: string;
  tags?: string[];
  project_id?: number;
}
export interface TaskUpdate {
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  priority?: "low" | "medium" | "high";
  due_date?: string;
  tags?: string[];
}
export interface Token {
  access_token: string;
  token_type: string;
}
export interface User {
  email: string;
  id: number;
  username: string;
  is_active: boolean;
  is_superuser: boolean;
}
export interface UserCreate {
  email: string;
  username: string;
  password?: string;
} 