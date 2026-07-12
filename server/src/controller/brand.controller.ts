import { NextFunction, Request, Response } from "express";
import Brand from "../models/brand.model";
import { catchAsync } from "../utils/catchAsync.utils";

export const getBrand = catchAsync(
  async (_, res: Response, next: NextFunction) => {
    const brands = await Brand.find();
    res.status(201).json({
      message: "Brands Found",
      status: "success",
      success: true,
      data: brands,
    });
    next();
  },
);

export const createBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    if (!name) return new Error("No name");
    if (!description) return new Error("No desc");
    const findBrand = await Brand.findOne({ name });
    if (findBrand) {
      throw new Error("Brand Already Exists");
    }
    const logoFile = req.file;
    if (!logoFile) {
      throw new Error("No logo");
    }
    const brand = await Brand.create({
      name,
      description,
      logo: logoFile?.filename,
    });
    res.status(201).json({
      message: "Brand Created",
      status: "success",
      success: true,
      data: brand,
    });
    next();
  },
);

export const getBrandById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const brand = await Brand.findById({ _id: id });
    res.status(201).json({
      message: `Brand: ${id} fetched`,
      status: "success",
      success: true,
      data: brand,
    });
    next();
  },
);

export const updateBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const brand = await Brand.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
    );
    res.status(201).json({
      message: "Brand Updated",
      status: "success",
      success: true,
      data: brand,
    });
    next();
  },
);

export const deleteBrand = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const brand = await Brand.findOneAndDelete({ _id: id });
    res.status(201).json({
      message: "Brand Deleted",
      status: "success",
      success: true,
      data: brand,
    });
    next();
  },
);
