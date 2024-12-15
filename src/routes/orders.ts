import express from "express";
import { getUserOrders, createOrder } from "../controllers/orderController";

const orderRoutes = express.Router();
orderRoutes.get("/:user", getUserOrders);
orderRoutes.post("/", createOrder);

export default orderRoutes;
