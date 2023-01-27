import { Request, Response, NextFunction } from "express";
import { database } from "./database";

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
