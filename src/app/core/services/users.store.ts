import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { Task } from '../models/task.model';
import { StorageStore } from './storage.store';
import { inject } from '@angular/core';
import { pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { User } from '../models/user.model';

interface UserWithAssignedTask { user: User, tasks: Task[] }

interface UsersState {
    users: UserWithAssignedTask[]
}

const initialState: UsersState = {
    users: [],
};

export const UsersStore = signalStore(
    withState(initialState),
    withMethods((store, storageStore = inject(StorageStore)) => {
        const _syncUsers = (users: UserWithAssignedTask[]) => {
            const updatedUsers = users.map(({ user }) => user)
            storageStore.updateUsers(updatedUsers)
        }

        const createUser = (name: string) => {
            const user: User = { id: crypto.randomUUID?.() ?? Date.now().toString(), name };
            const updated = [
                ...store.users(),
                { user, tasks: [] }
            ];
            patchState(store, { users: updated });
            _syncUsers(updated);
        }

        const updateUser = (id: string, patch: Partial<User>) => {
            const updated = store.users().map(e =>
                e.user.id === id ? { ...e, user: { ...e.user, ...patch } } : e
            );
            patchState(store, { users: updated });
            _syncUsers(updated);
        }

        const deleteUser = (id: string) => {
            const updated = store.users().filter(entry => entry.user.id !== id);
            patchState(store, { users: updated });
            _syncUsers(updated);
        }

        const loadUsers = rxMethod<UserWithAssignedTask[]>(
            pipe(
                tap((users) => {
                    patchState(store, { users })
                })
            ))
        return {
            loadUsers,
            updateUser,
            createUser,
            deleteUser
        }
    }),
    withHooks({
        onInit(store, storageStore = inject(StorageStore)) {
            store.loadUsers(storageStore.usersWithAssignedTasks())
        },
    })
);


