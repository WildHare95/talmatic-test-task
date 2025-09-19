import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { TaskStateEnum } from '../enums/task-state.enum';
import { computed, effect } from '@angular/core';
import { isEqual, map } from 'lodash';
import { loadFromLocalStorage, saveToLocalStorage } from '../../shared/utils/local-storage.utils';

export interface StorageState {
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
  withState<StorageState>(initialState),
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
  }),
  withMethods((store) => {
    const syncUsers = (users: User[]) => {
      const validIds = new Set(map(users, 'id'));
      const tasks = store.tasks();
      const now = new Date().toISOString();

      let touched = false;
      const nextTasks = tasks.map(t => {
        if (t.userId && !validIds.has(t.userId)) {
          touched = true;
          return {
            ...t,
            userId: null,
            state: TaskStateEnum.InQueue,
            updatedAt: now,
          };
        }
        return t;
      });

      if (touched) {
        patchState(store, { users: users, tasks: nextTasks });
      } else {
        patchState(store, { users: users });
      }
    }

    const syncTasks = (tasks: Task[]) => {
      patchState(store, { tasks })
    }

    return {
      syncUsers,
      syncTasks
    }
  }),
  withHooks({
    onInit(store) {
      const restored = loadFromLocalStorage();
      if (restored && !isEqual(restored, { users: store.users(), tasks: store.tasks() })) {
        patchState(store, restored);
      }
      effect(() => {
        const state: StorageState = { users: store.users(), tasks: store.tasks() };
        saveToLocalStorage(state);
      });
    }
  })
);
