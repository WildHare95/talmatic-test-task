import { TaskStateEnum } from '../enums/task-state.enum';

export interface Task {
  id: string;
  name: string;
  createdAt: string;   // ISO
  updatedAt: string;   // ISO
  state: TaskStateEnum;
  userId?: string;     // undefined => только 'in queue'
  description?: string;
}
