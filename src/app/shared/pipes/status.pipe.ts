import { Pipe, PipeTransform } from '@angular/core';
import { STATE_STATUS, TaskStateEnum } from '../../core/enums/task-state.enum';
import { NbComponentStatus } from '@nebular/theme';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(state: TaskStateEnum): NbComponentStatus {
    return STATE_STATUS[state] ?? 'basic';
  }

}
