import { z } from "zod";

export const userRegisterSchema = z.object({
  uname: z.string(),
  uemail: z.string().email(),
  password: z
    .string()
    .min(8, "password should be minimum of 8 characters")
    .max(20, "password should be of maximum of 20 characters"),
  age: z.number(),
  lname: z.string(),
  lemail: z.string().email(),
});

export const userSigninValidation = z.object({
  uemail: z.string().email(),
  password: z
    .string()
    .min(8, "password should be minimum of 8 characters")
    .max(20, "password should be of maximum of 20 characters"),
});

// Fake Data
// {
//   "uname": "JohnDoe",
//   "uemail": "johndoe@example.com",
//   "password": "securepassword123",
//   "age": 25,
//   "lname": "Doe",
//   "lemail": "leader@example.com"
// }
