import { Task } from "./task.model";

export interface User {
  id: string;
  name: string;
}

export interface UserWithAssignedTask { user: User, tasks: Task[] }