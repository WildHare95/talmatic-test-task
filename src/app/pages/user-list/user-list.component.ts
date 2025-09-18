import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UsersStore } from '../../core/services/users.store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  imports: [SharedModule],
  providers: [UsersStore]
})
export class UserListComponent {
  private readonly usersStore = inject(UsersStore)
  protected readonly usersData = this.usersStore.users
  protected update(param: any) {

  }
  protected delete(id: any) {

  }
}
