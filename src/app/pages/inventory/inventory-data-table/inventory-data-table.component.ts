import { Component, computed, Signal, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import {
  HlmTableComponent,
  HlmTableModule,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Inventory } from '@/ts/interfaces';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ConfirmDialogService } from '@/services/confirm-dialog.service';
import { HlmDialogService } from '@spartan-ng/ui-dialog-helm';
import { lucidePencil, lucidePlus, lucideTrash2 } from '@ng-icons/lucide';
import { InventoryDataService } from '@/pages/inventory/services/inventory-data.service';
import { InventoryDialogComponent } from '@/pages/inventory/inventory-dialog/inventory-dialog.component';
import { BrnTableModule } from '@spartan-ng/brain/table';

import { HlmPaginationModule } from '@spartan-ng/ui-pagination-helm';

import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '@/components/paginator/paginator.component';

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
  providers: [provideIcons({ lucideTrash2, lucidePencil, lucidePlus })],
  templateUrl: './inventory-data-table.component.html',
  standalone: true,
})
export class InventoryDataTableComponent {
  readonly availablePageSizes = [5, 10, 20, 50, 100];

  private readonly _pageSize$ = new BehaviorSubject<number>(
    this.availablePageSizes[0],
  );
  private readonly _currentPage$ = new BehaviorSubject<number>(1);
  private readonly _sortDirection$ = new BehaviorSubject<'ASC' | 'DESC' | null>(
    null,
  );

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
      this._sortDirection$,
      this._displayedIndices$,
    ]).pipe(
      map(([data, sort, { start, end }]) => {
        let result = [...data];
        if (sort) {
          result.sort(
            (a, b) =>
              (sort === 'ASC' ? 1 : -1) *
              a.productName.localeCompare(b.productName),
          );
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

  sortByName(direction: 'ASC' | 'DESC' | null): void {
    this._sortDirection$.next(direction);
    this.goToPage(1);
  }

  createNewEntry(): void {
    this.openInventoryDialog().subscribe((result?: Inventory) => {
      if (result) {
        result.id = this.generateId();
        const currentData = this.inventoryData$.value;
        this.inventoryData$.next([...currentData, result]);
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
