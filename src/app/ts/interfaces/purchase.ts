import { DeliveryStatus } from '../enums';

export interface Purchase {
  orderNr: string;
  product: string;
  category: string;
  quantity: number;
  totalPrice: number;
  deliveryStatus: DeliveryStatus;
}
