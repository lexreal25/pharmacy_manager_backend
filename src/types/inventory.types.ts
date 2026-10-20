export interface InventoryData {
  productId: string;
  quantity: number;
  price:number,
  description:string,
  supplier:string,
  
  // batchNumber: string;
  expiryDate: Date;
}
