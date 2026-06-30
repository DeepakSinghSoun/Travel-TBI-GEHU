import { z } from "zod";

// REGISTER VALIDATION SCHEMA
export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name too short"),
    email: z.string().trim().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password required"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept terms & conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// LOGIN VALIDATION SCHEMA
export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().min(6, "Password required"),
});