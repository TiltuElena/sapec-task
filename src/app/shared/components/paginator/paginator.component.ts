import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BrnSelectComponent,
  BrnSelectContentComponent,
  BrnSelectValueComponent,
} from '@spartan-ng/brain/select';
import {
  HlmPaginationContentDirective,
  HlmPaginationDirective,
  HlmPaginationItemDirective,
  HlmPaginationLinkDirective,
  HlmPaginationModule,
} from '@spartan-ng/ui-pagination-helm';
import {
  HlmSelectContentDirective,
  HlmSelectModule,
  HlmSelectValueDirective,
} from '@spartan-ng/ui-select-helm';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  imports: [
    BrnSelectComponent,
    BrnSelectContentComponent,
    BrnSelectValueComponent,
    HlmPaginationContentDirective,
    HlmPaginationDirective,
    HlmPaginationItemDirective,
    HlmPaginationLinkDirective,
    HlmPaginationModule,
    HlmSelectContentDirective,
    HlmSelectModule,
    HlmSelectValueDirective,
    FormsModule,
  ],
  templateUrl: './paginator.component.html',
  standalone: true,
})
export class PaginatorComponent {
  @Input() totalElements = 0;
  @Input() pageSize = 10;
  @Input() currentPage = 1;
  @Input() availablePageSizes: number[] = [5, 10, 20, 50, 100];

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.pageSize);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: number[] = [];

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const first = 1;
    const last = total;

    pages.push(first);

    if (current - 2 > first) pages.push(0);
    if (current - 1 > first) pages.push(current - 1);
    if (current !== first && current !== last) pages.push(current);
    if (current + 1 < last) pages.push(current + 1);
    if (current + 2 < last) pages.push(0);

    if (!pages.includes(last)) pages.push(last);

    return pages;
  }

  goToPage(page: number) {
    this.pageChange.emit(page);
  }

  changePageSize(size: number) {
    this.pageSizeChange.emit(size);
  }

  getEndIndex(
    currentPage: number,
    pageSize: number,
    totalElements: number,
  ): number {
    return Math.min(currentPage * pageSize, totalElements);
  }
}
