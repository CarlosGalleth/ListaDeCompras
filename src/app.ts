import express, { Application, Request, Response } from "express";
import { createPurchaseList } from "./logic";
const app: Application = express();
app.use(express.json());

app.post("/purchaseList", createPurchaseList);

app.listen(3000, () => {
  console.log("Server is running!");
});
