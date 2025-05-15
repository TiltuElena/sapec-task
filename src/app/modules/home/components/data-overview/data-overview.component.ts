import { Component } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { PurchasesDataService } from '@/modules/purchases/services/purchases-data.service';
import { PageRoutes } from '@/shared/enums';
import {
  lucideArrowRight,
  lucideDollarSign,
  lucideReceiptText,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-data-overview',
  imports: [
    AsyncPipe,
    BrnSeparatorComponent,
    CurrencyPipe,
    HlmButtonDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmIconDirective,
    HlmSeparatorDirective,
    NgIcon,
  ],
  templateUrl: './data-overview.component.html',
  standalone: true,
  providers: [
    provideIcons({ lucideArrowRight, lucideReceiptText, lucideDollarSign }),
  ],
})
export class DataOverviewComponent {
  totalNumberOfPurchases$: BehaviorSubject<number> = new BehaviorSubject(0);
  totalMoneySpent$: BehaviorSubject<number> = new BehaviorSubject(0);

  cardData: {
    title: string;
    data: BehaviorSubject<number>;
    icon: string;
    currency: boolean;
  }[] = [];

  constructor(
    private router: Router,
    private purchasesDataService: PurchasesDataService,
  ) {
    this.totalMoneySpent$ = this.purchasesDataService.totalMoneySpent$;
    this.totalNumberOfPurchases$ =
      this.purchasesDataService.totalNumberOfPurchases$;

    this.cardData = [
      {
        title: 'Total number of purchases',
        data: this.totalNumberOfPurchases$,
        icon: 'lucideReceiptText',
        currency: false,
      },
      {
        title: 'Total spent money',
        data: this.totalMoneySpent$,
        icon: 'lucideDollarSign',
        currency: true,
      },
    ];
  }

  redirectToPurchases(): void {
    this.router.navigate([PageRoutes.PURCHASES]);
  }
}
