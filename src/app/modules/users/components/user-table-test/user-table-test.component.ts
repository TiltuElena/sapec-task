import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  TrackByFunction,
  computed,
  effect,
  signal,
  untracked,
  Signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  lucideArrowUpDown,
  lucideChevronDown,
  lucideEllipsis,
  lucidePencil,
  lucidePlus,
  lucideTrash2,
} from '@ng-icons/lucide';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmCheckboxModule } from '@spartan-ng/ui-checkbox-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  BrnTableModule,
  PaginatorState,
  useBrnColumnManager,
} from '@spartan-ng/brain/table';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { BrnSelectModule } from '@spartan-ng/brain/select';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { debounceTime, map } from 'rxjs';
import { User } from '@/shared/interfaces';
import { UserDataService } from '@/modules/users/services/user-data.service';
import { UserDialogComponent } from '@/modules/users/components/user-dialog/user-dialog.component';
import { ConfirmDialogService } from '@/shared/services/confirm-dialog.service';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';

@Component({
  selector: 'app-user-table-test',
  imports: [
    FormsModule,
    BrnMenuTriggerDirective,
    HlmMenuModule,
    BrnTableModule,
    HlmTableModule,
    HlmButtonModule,
    TitleCasePipe,
    HlmIconDirective,
    HlmInputDirective,
    HlmCheckboxModule,
    BrnSelectModule,
    HlmSelectModule,
    NgIcon,
    DatePipe,
  ],
  templateUrl: './user-table-test.component.html',
  standalone: true,
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideEllipsis,
      lucideArrowUpDown,
      lucideTrash2,
      lucidePencil,
      lucidePlus,
    }),
  ],
  host: {
    class: 'w-full',
  },
})
export class UserTableTestComponent {
  userData: User[] = [];
  protected _userDataSignal: Signal<User[]> = signal<User[]>([]);
  protected readonly _rawFilterInput = signal('');
  protected readonly _dataFilter = signal('');
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300)),
  );

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<User>(true);
  protected readonly _isUserSelected = (user: User) =>
    this._selectionModel.isSelected(user);
  protected readonly _selected = toSignal(
    this._selectionModel.changed.pipe(
      map((change: any) => change.source.selected),
    ),
    {
      initialValue: [],
    },
  );

  protected readonly _brnColumnManager = useBrnColumnManager({
    id: { visible: true, label: 'ID' },
    fullName: { visible: true, label: 'Full Name' },
    email: { visible: true, label: 'Email' },
    creationTime: { visible: true, label: 'Creation Time' },
    role: { visible: true, label: 'Role' },
    status: { visible: true, label: 'Status' },
  });
  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  private readonly _users = computed(() => this._userDataSignal());

  private readonly _filteredPayments = computed(() => {
    const dataFilter = this._dataFilter()?.trim()?.toLowerCase();
    if (dataFilter && dataFilter.length > 0) {
      return this._users().filter((u) =>
        u.email.toLowerCase().includes(dataFilter),
      );
    }
    return this._users();
  });
  private readonly _dataSort = signal<'ASC' | 'DESC' | null>(null);
  protected readonly _filteredSortedPaginatedUsers = computed(() => {
    const sort = this._dataSort();
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const payments = this._filteredPayments();
    if (!sort) {
      return payments.slice(start, end);
    }
    return [...payments]
      .sort(
        (p1, p2) =>
          (sort === 'ASC' ? 1 : -1) * p1.email.localeCompare(p2.email),
      )
      .slice(start, end);
  });
  protected readonly _allFilteredPaginatedPaymentsSelected = computed(() =>
    this._filteredSortedPaginatedUsers().every((user) =>
      this._selected().includes(user),
    ),
  );
  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate =
      this._allFilteredPaginatedPaymentsSelected() ? true : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });

  protected readonly _trackBy: TrackByFunction<User> = (_: number, p: User) =>
    p.id;
  protected readonly _totalElements = computed(
    () => this._filteredPayments().length,
  );
  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });

  constructor(
    private userDataService: UserDataService,
    private confirmDialog: ConfirmDialogService,
    private readonly dialog: HlmDialogService,
  ) {
    // needed to sync the debounced filter to the name filter, but being able to override the
    // filter when loading new users without debounce
    this.userData = this.userDataService.userData$.getValue();

    this._userDataSignal = toSignal(this.userDataService.userData$, {
      initialValue: [],
    });

    effect(() => {
      const debouncedFilter = this._debouncedFilter();
      untracked(() => this._dataFilter.set(debouncedFilter ?? ''));
    });
  }

  protected togglePayment(user: User) {
    this._selectionModel.toggle(user);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedUsers());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedUsers());
    }
  }

  protected handleDataSortChange() {
    const sort = this._dataSort();
    if (sort === 'ASC') {
      this._dataSort.set('DESC');
    } else if (sort === 'DESC') {
      this._dataSort.set(null);
    } else {
      this._dataSort.set('ASC');
    }
  }

  createNewUser(): void {
    this.openUserDialog().subscribe((result?: User) => {
      if (result) {
        result.id = this.generateId();
        const newUser = [...this.userData];
        newUser.push(result);
        this.userDataService.userData$.next(newUser);
      }
    });
  }

  editUser(user: User): void {
    this.openUserDialog(user).subscribe((result?: User) => {
      if (result) {
        const index = this.userData.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          const newUserData = [...this.userData];
          newUserData[index] = result;
          this.userData = newUserData;
          this.userDataService.userData$.next(newUserData);
        }
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
