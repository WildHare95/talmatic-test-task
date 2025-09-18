import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Task } from '../models/task.model';
import { StorageStore } from './storage.store';
import { computed, inject } from '@angular/core';
import { pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

interface TasksState {
  tasks: Task[] | null
}


const initialState: TasksState = {
  tasks: null
};

export const TasksStore = signalStore(
  withState(initialState),
  withComputed((_, storageStore = inject(StorageStore)) => {
    const userList = computed(() => storageStore.users())
    return {
      userList
    }
  }),
  withMethods((store) => {
    const loadTasks = rxMethod<Task[]>(
      pipe(
        tap((tasks) => {
          patchState(store, { tasks })
        })
      ))
    return {
      loadTasks
    }
  }),
  withHooks({
    onInit(store, storageStore = inject(StorageStore)) {
      store.loadTasks(storageStore.tasks())
    },
  })
);


