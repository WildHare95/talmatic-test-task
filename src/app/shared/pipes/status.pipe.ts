import { Pipe, PipeTransform } from '@angular/core';
import { TaskStateEnum } from '../../core/enums/task-state.enum';
import { NbComponentStatus } from '@nebular/theme';
import { STATE_STATUS } from '../../core/constants/task.constants';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(state: TaskStateEnum): NbComponentStatus {
    return STATE_STATUS[state] ?? 'basic';
  }

}
