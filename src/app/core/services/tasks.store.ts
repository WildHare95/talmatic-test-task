import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Task } from '../models/task.model';
import { StorageStore } from './storage.store';
import { computed, inject } from '@angular/core';
import { pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TaskStateEnum } from '../enums/task-state.enum';
import { UserWithAssignedTask } from '../models/user.model';
import { assign, cloneDeep, find, isNull, map, some } from 'lodash';
import { NbToastrService } from '@nebular/theme';
import { STATE_LABEL } from '../constants/task.constants';

interface TasksState {
  tasks: Task[]
  users: UserWithAssignedTask[]
}

const initialState: TasksState = {
  tasks: [],
  users: []
};

export const TasksStore = signalStore(
  withState(initialState),
  withComputed((store) => {
    const userList = computed(() =>
      store.users().map(({ user }) => user)
    )
    return {
      userList
    }
  }),
  withMethods((store, storageStore = inject(StorageStore), toastrService = inject(NbToastrService)) => {

    const _nowISO = () => new Date().toISOString()
    const _syncTasks = (tasks: Task[]) => {
      storageStore.syncTasks(tasks)
    }

    const createTask = (payload: Pick<Task, 'name' | 'description'>) => {
      const task: Task = {
        id: crypto.randomUUID?.() ?? Date.now().toString(),
        createdAt: _nowISO(),
        updatedAt: _nowISO(),
        state: TaskStateEnum.InQueue,
        userId: null,
        ...payload
      }
      const updated = [...store.tasks(), task]
      patchState(store, { tasks: updated });
      _syncTasks(updated)
    }

    const updateTask = (id: string, task: Partial<Task>) => {
      const tasks = store.tasks();

      const current = find(tasks, { id });
      if (!current) return;

      const next: Task = assign(cloneDeep(current), task, { updatedAt: _nowISO() });

      try {
        assertRules(next, tasks);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        toastrService.show('', msg, { status: 'danger' })
        const updated = map(tasks, (t) => (t.id === id ? { ...current } : t));
        patchState(store, { tasks: updated });
        return;
      }

      const updated = map(tasks, (t) => (t.id === id ? next : t));

      patchState(store, { tasks: updated });
      _syncTasks(updated);
    }

    const deleteTask = (id: string) => {
      const updated = store.tasks().filter(e => e.id !== id);
      patchState(store, { tasks: updated });
      _syncTasks(updated)
    }

    const loadTasks = rxMethod<Task[]>(
      pipe(
        tap((tasks) => {
          patchState(store, { tasks })
        })
      ))

    const loadUsers = rxMethod<UserWithAssignedTask[]>(
      pipe(
        tap((users) => {
          patchState(store, { users })
        })
      ))

    const assertRules = (next: Task, all: Task[]): void | Error => {
      const unassigned = isNull(next.userId);

      if (unassigned && next.state !== TaskStateEnum.InQueue) {
        throw new Error(`Unassigned task can only be ${STATE_LABEL[TaskStateEnum.InQueue]} state.`);
      }

      if (!unassigned && next.state === TaskStateEnum.InProgress) {
        const anotherInProgress = some(all, (t) =>
          t.id !== next.id &&
          t.userId === next.userId &&
          t.state === TaskStateEnum.InProgress
        );
        if (anotherInProgress) {
          throw new Error(`User already has a task ${STATE_LABEL[TaskStateEnum.InProgress]} state.`);
        }
      }
    }

    return {
      loadTasks,
      updateTask,
      createTask,
      deleteTask,
      loadUsers
    }
  }),
  withHooks({
    onInit(store, storageStore = inject(StorageStore)) {
      store.loadTasks(storageStore.tasks())
      store.loadUsers(storageStore.usersWithAssignedTasks())
    },
  })
);


