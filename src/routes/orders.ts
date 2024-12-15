import express from "express";
import {
  getOrders,
  createOrder,
  getOrderById,
} from "../controllers/orderController";

const orderRouter = express.Router();
orderRouter.get("/:id", getOrderById);
orderRouter.get("/:user", getOrders);
orderRouter.post("/", createOrder);

export default orderRouter;
