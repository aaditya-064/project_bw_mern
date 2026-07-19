"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBrand = exports.getBrandById = exports.createBrand = exports.getBrand = void 0;
const brand_model_1 = __importDefault(require("../models/brand.model"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const pagination_utils_1 = require("../utils/pagination.utils");
exports.getBrand = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    // console.log(req.query);
    const { query, order = "DESC", sortBy = "createdAt", page = 1, limit = 10, } = req.query;
    const currentPage = Number(page);
    const perPage = Number(limit);
    const skip = (currentPage - 1) * perPage;
    const filter = {};
    if (query) {
        filter.$or = [
            {
                name: {
                    $regex: query,
                    $options: "i", //* case is in-sensitive
                },
            },
            {
                description: {
                    $regex: query,
                    $options: "i", //* case is in-sensitive
                },
            },
        ];
    }
    const brands = await brand_model_1.default.find(filter)
        .limit(perPage)
        .skip(skip)
        .sort({
        [sortBy]: order === "DESC" ? -1 : 1,
    });
    const totalCount = await brand_model_1.default.countDocuments(filter);
    res.status(201).json({
        message: "Brands Found",
        status: "success",
        success: true,
        data: {
            brands,
            pagination: (0, pagination_utils_1.getPagination)(totalCount, perPage, currentPage),
        },
    });
});
exports.createBrand = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { name, description } = req.body;
    if (!name)
        return new Error("No name");
    if (!description)
        return new Error("No desc");
    const findBrand = await brand_model_1.default.findOne({ name });
    if (findBrand) {
        throw new Error("Brand Already Exists");
    }
    // const logoFile = req.file;
    // if (!logoFile) {
    //   throw new Error("No logo");
    // }
    const brand = await brand_model_1.default.create({
        name,
        description,
        // logo: logoFile?.filename!!,
    });
    res.status(201).json({
        message: "Brand Created",
        status: "success",
        success: true,
        data: brand,
    });
});
exports.getBrandById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findById({ _id: id });
    res.status(201).json({
        message: `Brand: ${id} fetched`,
        status: "success",
        success: true,
        data: brand,
    });
});
exports.updateBrand = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findOneAndUpdate({ _id: id }, { $set: { ...req.body } });
    res.status(201).json({
        message: "Brand Updated",
        status: "success",
        success: true,
        data: brand,
    });
});
exports.deleteBrand = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findOneAndDelete({ _id: id });
    res.status(201).json({
        message: "Brand Deleted",
        status: "success",
        success: true,
        data: brand,
    });
});
