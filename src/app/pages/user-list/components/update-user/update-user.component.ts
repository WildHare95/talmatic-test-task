import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { FormControl, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';
import { SharedModule } from '../../../../shared/shared.module';
import { atLeastTwoNonSpace } from '../../../../core/constants/pattern.constants';

@Component({
  selector: 'app-update-user',
  imports: [SharedModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {
  @Input() user: User | null = null;
  private readonly windowRef = inject(NbWindowRef)
  protected readonly primaryButtonLabel = signal<null | string>(null)
  protected readonly userControl = new FormControl(
    '',
    { validators: [
                Validators.required, 
                Validators.minLength(2), 
                Validators.pattern(atLeastTwoNonSpace)
    ], nonNullable: true }
  )

  ngOnInit() {
    if (this.user) {
      this.userControl.setValue(this.user.name)
      this.primaryButtonLabel.set('Edit')
    } else {
      this.primaryButtonLabel.set('Create')
    }
  }

  get isValid(): boolean {
    return this.userControl.invalid || this.userControl.pristine;
  }

  protected update() {
    const name = this.userControl.value
    this.windowRef.close(name)
  }

  protected close() {
    this.windowRef.close()
  }
}
