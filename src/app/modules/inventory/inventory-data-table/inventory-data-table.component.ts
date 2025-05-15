import { Component } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import {
  HlmTableComponent,
  HlmTableModule,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Inventory } from '@/shared/interfaces';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ConfirmDialogService } from '@/shared/services/confirm-dialog.service';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import {
  lucidePencil,
  lucidePlus,
  lucideTrash2,
  lucideArrowUpDown,
} from '@ng-icons/lucide';
import { InventoryDialogComponent } from '@/modules/inventory/inventory-dialog/inventory-dialog.component';
import { BrnTableModule } from '@spartan-ng/brain/table';
import { HlmPaginationModule } from '@spartan-ng/ui-pagination-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '@/shared/components/paginator/paginator.component';
import { ToastService } from '@/shared/services/toast.service';
import { InventoryDataService } from '@/modules/inventory/services/inventory-data.service';

@Component({
  selector: 'app-inventory-data-table',
  imports: [
    HlmButtonDirective,
    HlmIconDirective,
    HlmTableComponent,
    HlmTableModule,
    HlmTrowComponent,
    NgIcon,
    CurrencyPipe,
    HlmPaginationModule,
    BrnTableModule,
    HlmSelectModule,
    FormsModule,
    PaginatorComponent,
    AsyncPipe,
  ],
  providers: [
    provideIcons({ lucideTrash2, lucidePencil, lucidePlus, lucideArrowUpDown }),
  ],
  templateUrl: './inventory-data-table.component.html',
  standalone: true,
})
export class InventoryDataTableComponent {
  readonly availablePageSizes = [5, 10, 20, 50, 100];

  private readonly _pageSize$ = new BehaviorSubject<number>(
    this.availablePageSizes[0],
  );
  private readonly _currentPage$ = new BehaviorSubject<number>(1);

  private readonly _sortState$ = new BehaviorSubject<{
    column: keyof Inventory | null;
    direction: 'ASC' | 'DESC' | null;
  }>({
    column: null,
    direction: null,
  });

  readonly inventoryData$: BehaviorSubject<Inventory[]>;

  readonly _totalElements$: Observable<number>;
  readonly _displayedIndices$: Observable<{ start: number; end: number }>;
  readonly _filteredSortedPaginatedEntries$: Observable<Inventory[]>;

  get pageSize$(): Observable<number> {
    return this._pageSize$.asObservable();
  }

  get currentPage$(): Observable<number> {
    return this._currentPage$.asObservable();
  }

  constructor(
    private readonly inventoryDataService: InventoryDataService,
    private readonly confirmDialog: ConfirmDialogService,
    private readonly dialog: HlmDialogService,
    private readonly toastService: ToastService,
  ) {
    this.inventoryData$ = this.inventoryDataService.inventoryData$;

    this._totalElements$ = this.inventoryData$.pipe(map((data) => data.length));

    this._displayedIndices$ = combineLatest([
      this._currentPage$,
      this._pageSize$,
      this._totalElements$,
    ]).pipe(
      map(([page, size, total]) => {
        const start = (page - 1) * size;
        const end = Math.min(start + size - 1, Math.max(0, total - 1));
        return { start, end };
      }),
    );

    this._filteredSortedPaginatedEntries$ = combineLatest([
      this.inventoryData$,
      this._sortState$,
      this._displayedIndices$,
    ]).pipe(
      map(([data, sortState, { start, end }]) => {
        let result = [...data];

        const { column, direction } = sortState;
        if (column && direction) {
          result.sort((a, b) => {
            const valA = a[column];
            const valB = b[column];

            if (valA == null) return direction === 'ASC' ? -1 : 1;
            if (valB == null) return direction === 'ASC' ? 1 : -1;

            if (typeof valA === 'string' && typeof valB === 'string') {
              return direction === 'ASC'
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
            }

            return direction === 'ASC'
              ? (valA as number) - (valB as number)
              : (valB as number) - (valA as number);
          });
        }

        return result.slice(start, end + 1);
      }),
    );
  }

  goToPage(page: number): void {
    this._currentPage$.next(page);
  }

  onPageSizeChange(pageSize: number): void {
    this._pageSize$.next(pageSize);
    this.goToPage(1);
  }

  sortByColumn(column: keyof Inventory): void {
    const current = this._sortState$.value;

    let newDirection: 'ASC' | 'DESC' | null = 'ASC';
    if (current.column === column) {
      if (current.direction === 'ASC') {
        newDirection = 'DESC';
      } else if (current.direction === 'DESC') {
        newDirection = null;
      }
    }

    this._sortState$.next({ column, direction: newDirection });
    this.goToPage(1);
  }

  createNewEntry(): void {
    this.openInventoryDialog().subscribe((result?: Inventory) => {
      if (result) {
        result.id = this.generateId();
        const currentData = this.inventoryData$.value;
        this.inventoryData$.next([...currentData, result]);

        const message = 'A new entry has been created';
        const description = `Created entry with ID ${result.id} at ${new Date().toLocaleString()}`;

        this.toastService.showSuccessToast(message, description);
      }
    });
  }

  editEntry(entry: Inventory): void {
    this.openInventoryDialog(entry).subscribe((result?: Inventory) => {
      if (result) {
        const data = [...this.inventoryData$.value];
        const index = data.findIndex((i) => i.id === entry.id);
        if (index !== -1) {
          data[index] = result;
          this.inventoryData$.next(data);
        }

        const message = 'Entry has been modified';
        const description = `Modified entry with ID ${entry.id} at ${new Date().toLocaleString()}`;

        this.toastService.showSuccessToast(message, description);
      }
    });
  }

  async deleteEntry(entry: Inventory): Promise<void> {
    const confirmed = await this.confirmDialog.confirm(
      `Delete entry with id ${entry.id}?`,
      'This action will permanently remove the entry.',
    );
    if (confirmed) {
      const updated = this.inventoryData$.value.filter(
        (i) => i.id !== entry.id,
      );
      this.inventoryData$.next(updated);

      const message = 'Entry has been deleted';
      const description = `Deleted entry with ID ${entry.id} at ${new Date().toLocaleString()}`;

      this.toastService.showSuccessToast(message, description);
    }
  }

  private generateId(): number {
    return Math.max(0, ...this.inventoryData$.value.map((u) => u.id ?? 0)) + 1;
  }

  private openInventoryDialog(entry?: Inventory) {
    return this.dialog.open(InventoryDialogComponent, {
      context: entry ? { entry } : undefined,
      contentClass: 'sm:!min-w-[500px] sm:!max-w-[600px]',
    }).closed$;
  }
}
