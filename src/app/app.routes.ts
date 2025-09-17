import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'users', component: UserListComponent },
  { path: '**', redirectTo: 'tasks' },
];
