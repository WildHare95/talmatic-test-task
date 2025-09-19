import { Component, inject, Input } from '@angular/core';
import { NbButtonModule, NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'app-delete-user',
  imports: [NbButtonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  @Input() deletedElement!: string
  @Input() deletedQuestion!: string

  private readonly windowRef = inject(NbWindowRef);

  protected delete() {
    this.windowRef.close(true)
  }
  protected close() {
    this.windowRef.close(false)
  }
}
