import { Component, inject, INJECTOR } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Task } from '../../core/models/task.model';
import { TaskStateEnum } from '../../core/enums/task-state.enum';
import { NbWindowService } from '@nebular/theme';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true,
  imports: [SharedModule],
})
export class TaskListComponent {
  data: Task[] = [
    {
      id: '1',
      createdAt: new Date().toISOString(),
      name: 'name',
      description: 'description',
      state: TaskStateEnum.Done,
      updatedAt: new Date().toISOString(),
      userId: 'userId'
    },
    {
      id: '2',
      createdAt: new Date().toISOString(),
      name: 'name',
      description: 'description',
      state: TaskStateEnum.InProgress,
      updatedAt: new Date().toISOString(),
      userId: 'userId'
    },
    {
      id: '3',
      createdAt: new Date().toISOString(),
      name: 'name',
      description: 'description',
      state: TaskStateEnum.InQueue,
      updatedAt: new Date().toISOString(),
      userId: 'userId'
    }
  ]
  users: User[] = [
    {
      id: '1',
      name: 'name1'
    },
    {
      id: '2',
      name: 'name2'
    },
    {
      id: '3',
      name: 'name3'
    }
  ]

  private readonly windowService = inject(NbWindowService);
  protected readonly  states = [TaskStateEnum.Done, TaskStateEnum.InQueue, TaskStateEnum.InProgress];
  assign(id: any, $event: any) {
    console.log(id, $event);
  }

  setState(id: any, $event: any) {

  }

  delete(id: any) {
  }

  edit(id: any) {
  }
}
