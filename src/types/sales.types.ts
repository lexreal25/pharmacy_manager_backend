export interface SalesItemInput{
  inventoryId:string,
  quantity:number;
}

export interface SalesData {
  customer: string;
  items:SalesItemInput[];
  discount:number;
  userId: string;
  paymentMethod:["Cash"| "Mobile Money" | "Card"]
}

export interface SalesRequestParams {
  [key:string]: string;
  id: string;
}
