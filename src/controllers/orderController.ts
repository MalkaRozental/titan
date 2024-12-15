import { Request, Response } from "express";
import Order from "../models/Order";
import logger from "../config/logger";

export const getUserOrders = async (req: Request, res: Response) => {
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
  const { email, fullName, fullAddress, imageUrls, frameColor, user } =
    req.body;

  if (
    !email ||
    !fullName ||
    !fullAddress ||
    !imageUrls ||
    !frameColor ||
    !user
  ) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }
  try {
    const order = new Order({
      email,
      fullName,
      fullAddress,
      imageUrls,
      frameColor,
      user,
    });
    await order.save();
    logger.info("Order was created sucessfuly");
    res.status(201).json(order);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};
