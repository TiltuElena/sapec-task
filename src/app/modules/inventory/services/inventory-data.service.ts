import { Injectable } from '@angular/core';
import { Inventory } from '../../../shared/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryDataService {
  inventoryData: Inventory[] = [
    {
      id: 0,
      productName: 'Item 1',
      category: 'phones',
      quantity: 3,
      pricePerUnit: 1500,
      stockCount: 20,
    },
    {
      id: 1,
      productName: 'Item 2',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 2000,
      stockCount: 15,
    },
    {
      id: 2,
      productName: 'Item 3',
      category: 'tablets',
      quantity: 2,
      pricePerUnit: 2000,
      stockCount: 13,
    },
    {
      id: 3,
      productName: 'Item 4',
      category: 'laptops',
      quantity: 1,
      pricePerUnit: 3000,
      stockCount: 9,
    },
    {
      id: 4,
      productName: 'Item 5',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 5,
      productName: 'Item 6',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 6,
      productName: 'Item 1',
      category: 'phones',
      quantity: 3,
      pricePerUnit: 1500,
      stockCount: 20,
    },
    {
      id: 7,
      productName: 'Item 2',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 2000,
      stockCount: 15,
    },
    {
      id: 8,
      productName: 'Item 3',
      category: 'tablets',
      quantity: 2,
      pricePerUnit: 2000,
      stockCount: 13,
    },
    {
      id: 9,
      productName: 'Item 4',
      category: 'laptops',
      quantity: 1,
      pricePerUnit: 3000,
      stockCount: 9,
    },
    {
      id: 10,
      productName: 'Item 5',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 11,
      productName: 'Item 6',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 12,
      productName: 'Item 1',
      category: 'phones',
      quantity: 3,
      pricePerUnit: 1500,
      stockCount: 20,
    },
    {
      id: 13,
      productName: 'Item 2',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 2000,
      stockCount: 15,
    },
    {
      id: 14,
      productName: 'Item 3',
      category: 'tablets',
      quantity: 2,
      pricePerUnit: 2000,
      stockCount: 13,
    },
    {
      id: 15,
      productName: 'Item 4',
      category: 'laptops',
      quantity: 1,
      pricePerUnit: 3000,
      stockCount: 9,
    },
    {
      id: 16,
      productName: 'Item 5',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 17,
      productName: 'Item 6',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 18,
      productName: 'Item 1',
      category: 'phones',
      quantity: 3,
      pricePerUnit: 1500,
      stockCount: 20,
    },
    {
      id: 19,
      productName: 'Item 2',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 2000,
      stockCount: 15,
    },
    {
      id: 20,
      productName: 'Item 3',
      category: 'tablets',
      quantity: 2,
      pricePerUnit: 2000,
      stockCount: 13,
    },
    {
      id: 21,
      productName: 'Item 4',
      category: 'laptops',
      quantity: 1,
      pricePerUnit: 3000,
      stockCount: 9,
    },
    {
      id: 22,
      productName: 'Item 5',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 23,
      productName: 'Item 6',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 24,
      productName: 'Item 4',
      category: 'laptops',
      quantity: 1,
      pricePerUnit: 3000,
      stockCount: 9,
    },
    {
      id: 25,
      productName: 'Item 5',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 26,
      productName: 'Item 6',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 27,
      productName: 'Item 5',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 28,
      productName: 'Item 6',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 29,
      productName: 'Item 5',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 30,
      productName: 'Item 6',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 31,
      productName: 'Item 5',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
    {
      id: 32,
      productName: 'Item 6',
      category: 'phones',
      quantity: 1,
      pricePerUnit: 5000,
      stockCount: 9,
    },
  ];

  inventoryData$: BehaviorSubject<Inventory[]> = new BehaviorSubject<
    Inventory[]
  >(this.inventoryData);
}
