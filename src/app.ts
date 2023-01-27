import express, { Application } from "express";
import {
  createPurchaseList,
  deleteListItem,
  deletePurchase,
  getAllPurchase,
  getOnePurchase,
  updatePurchase,
} from "./logic";
import { ensurePurchaseExists } from "./middlewares";
const app: Application = express();
app.use(express.json());

app.post("/purchaseList", createPurchaseList);
app.get("/purchaseList", getAllPurchase);
app.get("/purchaseList/:id", ensurePurchaseExists, getOnePurchase);
app.patch("/purchaseList/:id", ensurePurchaseExists, updatePurchase);
app.delete("/purchaseList/:id", ensurePurchaseExists, deletePurchase);
app.delete("/purchaseList/:id/:name", ensurePurchaseExists, deleteListItem);

app.listen(3000, () => {
  console.log("Server is running!");
});
