import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { Task } from '../models/task.model';
import { StorageStore } from './storage.store';
import { computed, inject } from '@angular/core';
import { pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { User } from '../models/user.model';

interface UserWithAssignedTask { user: User, tasks: Task[] }

interface UsersState {
    users: UserWithAssignedTask[] | null
}


const initialState: UsersState = {
    users: null
};

export const UsersStore = signalStore(
    withState(initialState),
    withMethods((store) => {
        const loadUsers = rxMethod<UserWithAssignedTask[]>(
            pipe(
                tap((users) => {
                    patchState(store, { users })
                })
            ))
        return {
            loadUsers
        }
    }),
    withHooks({
        onInit(store, storageStore = inject(StorageStore)) {
            store.loadUsers(storageStore.usersWithAssignedTasks())
        },
    })
);


