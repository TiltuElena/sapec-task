import { Component } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import {
  HlmTableComponent,
  HlmTableModule,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Purchase } from '@/ts/interfaces';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import {
  lucidePencil,
  lucidePlus,
  lucideTrash2,
  lucideArrowUpDown,
} from '@ng-icons/lucide';
import { BrnTableModule } from '@spartan-ng/brain/table';
import { HlmPaginationModule } from '@spartan-ng/ui-pagination-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '@/components/paginator/paginator.component';
import { PurchasesDataService } from '@/pages/purchases/services/purchases-data.service';

@Component({
  selector: 'app-purchases-data-table',
  imports: [
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
  templateUrl: './purchases-data-table.component.html',
  standalone: true,
})
export class PurchasesDataTableComponent {
  readonly availablePageSizes = [5, 10, 20, 50, 100];

  private readonly _pageSize$ = new BehaviorSubject<number>(
    this.availablePageSizes[0],
  );
  private readonly _currentPage$ = new BehaviorSubject<number>(1);

  private readonly _sortState$ = new BehaviorSubject<{
    column: keyof Purchase | null;
    direction: 'ASC' | 'DESC' | null;
  }>({
    column: null,
    direction: null,
  });

  readonly purchasesData$: BehaviorSubject<Purchase[]>;
  readonly _totalElements$: Observable<number>;
  readonly _displayedIndices$: Observable<{ start: number; end: number }>;
  readonly _filteredSortedPaginatedEntries$: Observable<Purchase[]>;

  get pageSize$(): Observable<number> {
    return this._pageSize$.asObservable();
  }

  get currentPage$(): Observable<number> {
    return this._currentPage$.asObservable();
  }

  constructor(
    private readonly purchasesDataService: PurchasesDataService,
  ) {
    this.purchasesData$ = this.purchasesDataService.purchasesData$;

    this._totalElements$ = this.purchasesData$.pipe(map((data) => data.length));

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
      this.purchasesData$,
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

  sortByColumn(column: keyof Purchase): void {
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

}
