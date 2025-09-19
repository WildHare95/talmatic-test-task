import { NbComponentStatus } from "@nebular/theme";
import { TaskStateEnum } from "../enums/task-state.enum";

export const STATE_LABEL: Record<TaskStateEnum, string> = {
  [TaskStateEnum.InQueue]: 'in queue',
  [TaskStateEnum.InProgress]: 'in progress',
  [TaskStateEnum.Done]: 'done',
};

export const STATE_STATUS: Record<TaskStateEnum, NbComponentStatus> = {
  [TaskStateEnum.InQueue]: 'info',
  [TaskStateEnum.InProgress]: 'warning',
  [TaskStateEnum.Done]: 'success',
};

export const STATE_LIST = [TaskStateEnum.Done, TaskStateEnum.InQueue, TaskStateEnum.InProgress]
