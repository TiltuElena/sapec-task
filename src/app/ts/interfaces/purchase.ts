import { DeliveryStatus } from '../enums';

export interface Purchase {
  orderNr: number;
  product: string;
  category: string;
  quantity: number;
  totalPrice: number;
  deliveryStatus: DeliveryStatus;
}
