import {
  IProductId,
  IProductsList,
  ProductDataRequiredKeys,
  ProductRequiredKeys,
} from "./interfaces";
import { request, Request, Response } from "express";
import { database, ids } from "./database";

const validatePurchaseData = (payload: any): IProductsList => {
  const keys: Array<string> = Object.keys(payload);
  const requiredKeys: Array<ProductRequiredKeys> = ["listName", "data"];
  const requiredKeysData: Array<ProductDataRequiredKeys> = ["name", "quantity"];
  const containsAllRequired: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (!containsAllRequired) {
    throw new Error(`Required keys are: ${requiredKeys}`);
  }
  if (keys.length > requiredKeys.length) {
    throw new Error(`Required keys are: ${requiredKeys}`);
  }

  const containsAllRequiredData: boolean = requiredKeysData.every(
    (key: string) => {
      return payload.data.every((elem: any) => {
        const payloadKey = Object.keys(elem);
        return payloadKey.every((payKey: any): boolean => {
          return requiredKeysData.includes(payKey);
        });
      });
    }
  );

  if (!containsAllRequiredData) {
    throw new Error(`Required keys are: ${requiredKeys}`);
  }

  return payload;
};

export const createPurchaseList = (request: Request, response: Response) => {
  try {
    const orderData: IProductsList = validatePurchaseData(request.body);
    const id: number = database.length + 1;
    const idExists = ids.find((el) => el === id);
    if (typeof orderData.listName !== "string") {
      return response.status(400).json({
        message: "Internal server error",
      });
    }
    if (idExists) {
      return response.status(409).json({
        message: "id exists, try again",
      });
    }

    const newOrderData: IProductId = {
      id: id,
      ...orderData,
    };
    ids.push(id);
    database.push(newOrderData);
    return response.status(201).json(newOrderData);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllPurchase = (request: Request, response: Response) => {
  return response.json(database);
};

export const getOnePurchase = (request: Request, response: Response) => {
  const indexPurchase: number = request.purchase.indexPurchase;

  return response.json(database[indexPurchase]);
};

export const updatePurchase = (
  request: Request,
  response: Response
): Response => {
  const indexPurchase: number = request.purchase.indexPurchase;

  database[indexPurchase] = { ...database[indexPurchase], ...request.body };

  return response.json(database[indexPurchase]);
};

export const deleteWorkOrder = (
  request: Request,
  response: Response
): Response => {
  const indexPurchase: number = request.purchase.indexPurchase;

  database.splice(indexPurchase, 1);

  return response.status(204).send();
};
