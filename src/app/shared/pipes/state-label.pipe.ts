import { Pipe, PipeTransform } from '@angular/core';
import { STATE_LABEL, TaskStateEnum } from '../../core/enums/task-state.enum';

@Pipe({ name: 'stateLabel', standalone: true, pure: true })
export class StateLabelPipe implements PipeTransform {
  transform(state: TaskStateEnum): string {
    return STATE_LABEL[state] ?? '—';
  }
}
