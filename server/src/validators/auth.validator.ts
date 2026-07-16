import { z } from "zod";

// body
// params
// query

export const registerUserSchema = z.object({
  body: z.object({
    full_name: z
      .string("full_name must be string")
      .min(3, "full_name must be atleast 3 characters long")
      .max(50, "full_name must not exceed 50 characters"),
    //   .nullable,
    email: z.email({
      error: (issue) =>
        issue.input === undefined
          ? "Email is required"
          : "Invalid Email Format",
    }),
    password: z
      .string("password must be string")
      .min(6, "password must be atleast 6 characters long"),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

export const brandSchema = z.object({});
