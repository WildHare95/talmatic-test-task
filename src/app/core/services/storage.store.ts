import { signalStore, withComputed, withState } from '@ngrx/signals';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { TaskStateEnum } from '../enums/task-state.enum';
import { computed } from '@angular/core';

interface StorageState {
  users: User[];
  tasks: Task[];
}


const initialState: StorageState = {
  users: [
    { id: '1', "name": "Alice" },
    { id: '2', "name": "Bob" }
  ],
  tasks: [
    {
      id: '1',
      name: "Init Angular + Nebular",
      description: "Scaffold project and theme",
      state: TaskStateEnum.InProgress,
      userId: '1',
      createdAt: '2025-09-18T14:15:59.577Z',
      updatedAt: '2025-09-18T14:15:59.577Z'
    }
  ]
};

export const StorageStore = signalStore(
  withState(initialState),
  withComputed((store) => {
    const usersWithAssignedTasks = computed(() => {
      const byId = new Map(
        store.users().map(u => [u.id, { user: u, tasks: [] as Task[] }])
      );

      for (const t of store.tasks()) {
        if (!t.userId) continue;
        const entry = byId.get(t.userId);
        if (entry) entry.tasks.push(t);
      }

      return [...byId.values()];
    });
    return {
      usersWithAssignedTasks
    }
  })
);
