import { Component, computed, inject, INJECTOR } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TaskStateEnum } from '../../core/enums/task-state.enum';
import { NbWindowService } from '@nebular/theme';
import { TasksStore } from '../../core/services/tasks.store';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true,
  imports: [SharedModule],
  providers: [TasksStore]
})
export class TaskListComponent {
  private readonly taskStore = inject(TasksStore)
  private readonly windowService = inject(NbWindowService);

  protected readonly tasksData = this.taskStore.tasks
  protected readonly userList = this.taskStore.userList
  protected readonly usersMap = computed(() => {
    const userList = this.userList()
    return new Map(
      userList.map(u => [u.id, u.name ])
    );
  })

  protected readonly states = [TaskStateEnum.Done, TaskStateEnum.InQueue, TaskStateEnum.InProgress];

  assign(taskId: any, userId: any) {
  }

  setState(id: any, $event: any) {

  }

  delete(id: any) {
  }

  edit(id: any) {
  }
}
