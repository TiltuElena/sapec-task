import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { User } from '@/shared/interfaces';
import { HlmTableModule } from '@/shared/components/libs/ui/ui-table-helm/src';
import { AsyncPipe, DatePipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmIconDirective } from '@/shared/components/libs/ui/ui-icon-helm/src';
import { lucideTrash2, lucidePencil, lucidePlus } from '@ng-icons/lucide';
import { ConfirmDialogService } from '@/shared/services/confirm-dialog.service';
import { HlmDialogService } from '@/shared/components/libs/ui/ui-dialog-helm/src';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { HlmButtonDirective } from '@/shared/components/libs/ui/ui-button-helm/src';
import { HlmTableComponent } from '@/shared/components/libs/ui/ui-table-helm/src';

@Component({
  selector: 'app-user-data-table',
  imports: [
    HlmTableModule,
    DatePipe,
    HlmButtonDirective,
    HlmIconDirective,
    NgIcon,
    AsyncPipe,
    HlmButtonDirective,
    HlmTableComponent,
  ],
  providers: [provideIcons({ lucideTrash2, lucidePencil, lucidePlus })],
  templateUrl: './user-data-table.component.html',
  standalone: true,
})
export class UserDataTableComponent {
  userData: User[] = [];
  userData$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private userDataService: UserDataService,
    private confirmDialog: ConfirmDialogService,
    private readonly dialog: HlmDialogService,
  ) {
    this.userData$ = this.userDataService.userData$;
    this.userData = this.userData$.getValue();
  }

  createNewUser(): void {
    this.openUserDialog().subscribe((result?: User) => {
      if (result) {
        result.id = this.generateId();
        this.userData.push(result);
        this.userDataService.userData$.next(this.userData);
      }
    });
  }

  editUser(user: User): void {
    this.openUserDialog(user).subscribe((result?: User) => {
      if (result) {
        const index = this.userData.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          this.userData[index] = result;
        }

        this.userDataService.userData$.next(this.userData);
      }
    });
  }

  private openUserDialog(user?: User) {
    return this.dialog.open(UserDialogComponent, {
      context: user ? { user } : undefined,
      contentClass: 'sm:!min-w-[500px] sm:!max-w-[600px]',
    }).closed$;
  }

  private generateId(): number {
    return Math.max(0, ...this.userData.map((u) => u.id ?? 0)) + 1;
  }

  async deleteUser(user: User) {
    const confirmed = await this.confirmDialog.confirm(
      `Delete user ${user.fullName}?`,
      'This action will permanently remove the user.',
    );
    if (confirmed) {
      this.userData = this.userData.filter(
        (userData) => userData.id !== user.id,
      );

      this.userDataService.userData$.next(this.userData);
    } else {
      console.log('User cancelled');
    }
  }
}
