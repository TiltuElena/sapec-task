import { Injectable } from '@angular/core';
import { Purchase } from '@/shared/interfaces';
import { BehaviorSubject } from 'rxjs';
import { DeliveryStatus } from '@/shared/enums';

@Injectable({
  providedIn: 'root',
})
export class PurchasesDataService {
  purchasesData: Purchase[] = [
    {
      orderNr: 0,
      product: 'Product 1',
      category: 'phones',
      quantity: 3,
      totalPrice: 300,
      deliveryStatus: DeliveryStatus.DELIVERED,
    },
    {
      orderNr: 1,
      product: 'Product 2',
      category: 'tablets',
      quantity: 4,
      totalPrice: 100,
      deliveryStatus: DeliveryStatus.CANCELLED,
    },
    {
      orderNr: 2,
      product: 'Product 3',
      category: 'tablets',
      quantity: 3,
      totalPrice: 500,
      deliveryStatus: DeliveryStatus.PENDING,
    },
    {
      orderNr: 3,
      product: 'Product 4',
      category: 'phones',
      quantity: 3,
      totalPrice: 300,
      deliveryStatus: DeliveryStatus.DELIVERED,
    },
    {
      orderNr: 4,
      product: 'Product 5',
      category: 'PCs',
      quantity: 1,
      totalPrice: 100,
      deliveryStatus: DeliveryStatus.PENDING,
    },
    {
      orderNr: 5,
      product: 'Product 6',
      category: 'PCs',
      quantity: 3,
      totalPrice: 500,
      deliveryStatus: DeliveryStatus.PENDING,
    },
  ];

  private calculateTotalMoneySpent(): number {
    return this.purchasesData$
      .getValue()
      .reduce((total, purchase) => total + purchase.totalPrice, 0);
  }

  purchasesData$ = new BehaviorSubject<Purchase[]>(this.purchasesData);
  totalNumberOfPurchases$: BehaviorSubject<number> = new BehaviorSubject(
    this.purchasesData$.getValue().length,
  );
  totalMoneySpent$: BehaviorSubject<number> = new BehaviorSubject(
    this.calculateTotalMoneySpent(),
  );
}
