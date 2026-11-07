import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerOrderInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  notes?: string;
  cndpConsent?: boolean;
}

export interface CompletedOrder {
  orderId: string;
  items: CartItem[];
  customer: CustomerOrderInfo;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
}
