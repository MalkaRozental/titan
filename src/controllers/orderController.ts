import { Request, Response } from "express";
import Order, { IOrder } from "../models/Order";
import logger from "../config/logger";
import NodeCache from "node-cache";
import axios from "axios";

const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cacheKey = `order:${id}`;

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Serving from cache");
    res.status(201).json(cachedData);
    return;
  }

  try {
    const order = await Order.findOne({ id });
    console.log("order---", order);
    cache.set(cacheKey, order);

    console.log("Serving from API");
    res.status(201).json(order);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to fetch data from API" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { user } = req.params;
    const orders = await Order.find({ user });
    res.json(orders);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new Order({ ...req.body });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};
