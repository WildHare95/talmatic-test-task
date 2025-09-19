import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TaskStateEnum } from '../../core/enums/task-state.enum';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { TasksStore } from '../../core/services/tasks.store';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { Task } from '../../core/models/task.model';
import { filter, map, tap } from 'rxjs';
import { trimObjectStrings } from '../../shared/utils/object.utils';
import { DeleteModalComponent } from '../../shared/components/delete-modal/delete-modal.component';
import { STATE_LIST } from '../../core/constants/task.constants';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true,
  imports: [SharedModule],
  providers: [TasksStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnDestroy {
  private readonly taskStore = inject(TasksStore)
  private readonly windowService = inject(NbWindowService);
  private readonly openedWindows = new Set<NbWindowRef>();

  protected readonly tasksData = this.taskStore.tasks;
  protected readonly userList = this.taskStore.userList;

  protected readonly usersMap = computed(() => {
    const userList = this.userList()
    return new Map(
      userList.map(u => [u.id, u.name])
    );
  })

  protected readonly states = STATE_LIST;

  protected assign(task: Task, userId: string | null) {
    const { id, userId: taskUserId } = task;
    if (taskUserId === userId) return;
    this.taskStore.updateTask(id, { userId });
  }

  protected setState(task: Task, state: TaskStateEnum) {
    const { state: taskState } = task
    if (state === taskState) return
    this.taskStore.updateTask(task.id, { state })
  }

  protected delete(task: Task) {
    const windowRef = this.windowService.open(DeleteModalComponent,
      {
        title: 'Delete task',
        context: { deletedElement: task.name, deletedQuestion: 'Are you sure want to delete current task:' }
      });
    windowRef.onClose.pipe(
      filter((isDeleted?: boolean) => !!isDeleted),
      tap(() => this.taskStore.deleteTask(task.id))
    ).subscribe()

  }

  protected edit(taskParams: Task | null) {
    const isNewTask = !!taskParams;
    const title = isNewTask ? 'Edit task' : 'Create task'
    const windowRef = this.windowService.open(UpdateTaskComponent, { title, context: { task: taskParams } })
    windowRef.onClose
      .pipe(
        filter((payload) => !!payload),
        map((payload: Pick<Task, 'name' | 'description'>) => trimObjectStrings(payload)),
        tap((task) => {
          if (isNewTask) {
            this.taskStore.updateTask(taskParams.id, task)
          } else {
            this.taskStore.createTask(task)
          }
        })
      )
      .subscribe(() => {
        this.openedWindows.delete(windowRef)
      })
    this.openedWindows.add(windowRef)
  }

  ngOnDestroy() {
    this.closeAllOpenedWindows()
  }

  private closeAllOpenedWindows() {
    Array.from(this.openedWindows).forEach(w => w.close())
  }
}
