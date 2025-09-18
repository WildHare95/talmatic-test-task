import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UsersStore } from '../../core/services/users.store';
import { NbWindowService } from '@nebular/theme';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { User } from '../../core/models/user.model';
import { filter, map, tap } from 'rxjs';
import { isString, trim } from 'lodash';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  imports: [SharedModule],
  providers: [UsersStore]
})
export class UserListComponent {
  private readonly usersStore = inject(UsersStore)
  private readonly windowService = inject(NbWindowService);
  protected readonly usersData = this.usersStore.users

  protected update(userParams: User | null) {
    const isNewUser = !!userParams
    const title = isNewUser ? 'Edit user' : 'Create user'

    const windowRef = this.windowService.open(UpdateUserComponent, { title, context: { user: userParams } });
    windowRef.onClose.pipe(
      map((payload) => (isString(payload) ? trim(payload) : undefined)),
      filter((userName): userName is string => !!userName),
      tap((userName) => {
        if (isNewUser) {
          const { id } = userParams
          this.usersStore.updateUser(id, { name: userName })
        } else {
          this.usersStore.createUser(userName)
        }
      })
    ).subscribe()

  }

  protected delete({id, name: userName}: User) {
    const windowRef = this.windowService.open(DeleteUserComponent, { title: 'Delete user', context: { userName }});
    windowRef.onClose.pipe(
      filter((isDeleted?: boolean) => !!isDeleted),
      tap(() => this.usersStore.deleteUser(id))
    ).subscribe()
  }
}
