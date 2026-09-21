export interface SalesData {
  productId: string;
  customerName: string;
  quantity: number;
  totalAmount: number;
  price: number;
  tax_value: number; //if applicable
  discount: number; //if applicable
  user_id:string; //reference to the user who created the sales record
}

export interface SalesRequestParams {
  [key:string]: string;
  id: string;
}
