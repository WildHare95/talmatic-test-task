import { Pipe, PipeTransform } from '@angular/core';
import { TaskStateEnum } from '../../core/enums/task-state.enum';
import { STATE_LABEL } from '../../core/constants/task.constants';

@Pipe({ name: 'stateLabel', standalone: true, pure: true })
export class StateLabelPipe implements PipeTransform {
  transform(state: TaskStateEnum): string {
    return STATE_LABEL[state] ?? '—';
  }
}
