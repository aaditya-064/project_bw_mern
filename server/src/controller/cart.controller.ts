import { NextFunction, Request, Response } from "express";
import Cart from "../models/cart.model";
import { catchAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";
// import User from "../models/user.model";

export const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, items } = req.body;
    const existingCart = await Cart.findOne({ user });
    if (existingCart) {
      existingCart.items = items;
      await existingCart.save();
      return sendResponse(res, {
        message: "Cart updated successfully",
        statusCode: 200,
        data: {
          cart: existingCart,
        },
      });
    }
    const cart = await Cart.create({ user, items });

    sendResponse(res, {
      message: "Cart created successfully",
      statusCode: 201,
      data: {
        cart,
      },
    });
  },
);

export const addQuantity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, productId, quantity } = req.body;
    const cart = await Cart.findOne({ user });
    if (!cart) {
      return sendResponse(res, {
        message: "Cart not found",
        statusCode: 404,
        data: null,
      });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  },
);
