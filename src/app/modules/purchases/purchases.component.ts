import { Component } from '@angular/core';
import { PurchasesDataTableComponent } from '@/modules/purchases/purchases-data-table/purchases-data-table.component';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
} from '@/shared/components/libs/ui/ui-card-helm/src';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { HlmSeparatorDirective } from '@/shared/components/libs/ui/ui-separator-helm/src';

@Component({
  selector: 'app-purchases',
  imports: [
    PurchasesDataTableComponent,
    HlmCardDirective,
    HlmCardContentDirective,
    HlmCardHeaderDirective,
    BrnSeparatorComponent,
    HlmSeparatorDirective,
  ],
  templateUrl: './purchases.component.html',
  standalone: true,
})
export class PurchasesComponent {}
