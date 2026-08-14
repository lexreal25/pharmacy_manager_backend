export interface SalesData {
  productId: string;
  customerName: string;
  quantity: number;
  totalAmount: number;
  price: number;
  tax_value: number; //if applicable
  discount: number; //if applicable
}

export interface SalesRequestParams {
  [key:string]: string;
  id: string;
}
