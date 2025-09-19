import { TaskStateEnum } from '../enums/task-state.enum';

export interface Task {
  id: string;
  name: string;
  createdAt: string;   // as ISO
  updatedAt: string;   // as ISO
  state: TaskStateEnum;
  userId: string | null;
  description?: string;
}
