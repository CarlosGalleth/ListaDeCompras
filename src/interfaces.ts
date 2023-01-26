export interface IProductsList {
  listName: string;
  data: Array<IProduct>;
}

export interface IProductId extends IProductsList {
  id: number;
}

export interface IProduct {
  name: string;
  quantity: string;
}

export type ProductRequiredKeys = "listName" | "data";
export type ProductDataRequiredKeys = "name" | "quantity";
