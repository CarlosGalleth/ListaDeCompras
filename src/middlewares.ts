import { Request, Response, NextFunction } from "express";
import { database } from "./database";
import {
  IProductsList,
  ProductDataRequiredKeys,
  ProductRequiredKeys,
} from "./interfaces";
import { validatePurchaseData } from "./logic";

export const ensurePurchaseExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id: number = Number(request.params.id);
  const name: string = String(request.params.name);
  const indexPurchase = database.findIndex((elem) => elem.id === id);

  if (indexPurchase === -1) {
    return response.status(404).json({
      message: "Purchase not found",
    });
  }

  request.purchase = {
    indexPurchase: indexPurchase,
    purchaseName: name,
  };

  return next();
};

export const ensurePatchExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const keys: Array<string> = Object.keys(request.body);
  const requiredKeys: Array<ProductRequiredKeys> = ["listName", "data"];
  const requiredKeysData: Array<ProductDataRequiredKeys> = ["name", "quantity"];

  const verifyItemData = requiredKeysData.every((elem) => {
    return keys.includes(elem);
  });

  if (!verifyItemData) {
    return response.status(400).json({
      message: "Internal server error",
    });
  }

  return next();
};
