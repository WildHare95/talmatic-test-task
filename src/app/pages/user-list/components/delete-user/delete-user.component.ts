import { Component, inject, Input } from '@angular/core';
import { NbButtonModule, NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'app-delete-user',
  imports: [NbButtonModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent {
  @Input() userName!: string
  private readonly windowRef = inject(NbWindowRef);

  protected delete() {
    this.windowRef.close(true)
  }
  protected close() {
    this.windowRef.close(false)
  }
}
