import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { Task } from '../../../../core/models/task.model';
import { SharedModule } from '../../../../shared/shared.module';
import { atLeastTwoNonSpace } from '../../../../core/constants/pattern.constants';

interface ITaskFormGroup {
  name: FormControl<string>;
  description: FormControl<string | null>
}

@Component({
  selector: 'app-update-task',
  imports: [SharedModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent implements OnInit {
  @Input() task: Task | null = null

  private readonly windowRef = inject(NbWindowRef)
  protected readonly primaryButtonLabel = signal<null | string>(null)

  protected readonly taskFormGroup = new FormGroup<ITaskFormGroup>({
    name: new FormControl('', 
      { 
        validators: [
          Validators.required, 
          Validators.minLength(2), 
          Validators.pattern(atLeastTwoNonSpace)
        ], 
        nonNullable: true 
      }
    ),
    description: new FormControl(null),
  })

  ngOnInit(): void {
    if (this.task) {
      this.initForm(this.task)
      this.primaryButtonLabel.set('Edit')
    } else {
      this.primaryButtonLabel.set('Create')
    }
  }

  private initForm({ name, description }: Task) {
    this.taskFormGroup.setValue(
      {
        name,
        description: description ?? null,
      }
    )
  }

  get isValid() {
    return this.taskFormGroup.invalid || this.taskFormGroup.pristine
  };

  get isNameValid() {
    return this.taskFormGroup.controls.name.invalid && this.taskFormGroup.controls.name.touched
  };

  protected update() {
    const value = this.taskFormGroup.value
    this.windowRef.close(value)
  }

  protected close() {
    this.windowRef.close()
  }
}
