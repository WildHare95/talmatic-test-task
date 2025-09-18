import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Task } from '../../core/models/task.model';
import { TaskStateEnum } from '../../core/enums/task-state.enum';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [SharedModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

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

  protected update(param: any) {

  }

  protected delete(id: any) {

  }
}
