"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
// body
// params
// query
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z
            .string("full_name must be string")
            .min(3, "full_name must be atleast 3 characters long")
            .max(50, "full_name must not exceed 50 characters"),
        //   .nullable,
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined
                ? "Email is required"
                : "Invalid Email Format",
        }),
        password: zod_1.z
            .string("password must be string")
            .min(6, "password must be atleast 6 characters long"),
    }),
    params: zod_1.z.object({}).default({}),
    query: zod_1.z.object({}).default({}),
});
exports.brandSchema = zod_1.z.object({});
