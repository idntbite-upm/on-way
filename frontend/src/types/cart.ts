export interface CartItem {
  product: string;
  productType: "Product" | "MarketplaceProduct";
  quantity: number;
  price: number;
  name: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_FROM_CART"; payload: { product: string } }
  | { type: "UPDATE_QUANTITY"; payload: { product: string; quantity: number } }
  | { type: "CLEAR_CART" };