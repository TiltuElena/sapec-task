import { Component } from '@angular/core';
import { PurchasesDataTableComponent } from '@/pages/purchases/purchases-data-table/purchases-data-table.component';
import {HlmCardContentDirective, HlmCardDirective, HlmCardHeaderDirective} from '@spartan-ng/ui-card-helm';
import {BrnSeparatorComponent} from '@spartan-ng/brain/separator';
import {HlmSeparatorDirective} from '@spartan-ng/ui-separator-helm';

@Component({
  selector: 'app-purchases',
  imports: [PurchasesDataTableComponent, HlmCardDirective, HlmCardContentDirective, HlmCardHeaderDirective, BrnSeparatorComponent, HlmSeparatorDirective],
  templateUrl: './purchases.component.html',
  standalone: true,
})
export class PurchasesComponent {}
