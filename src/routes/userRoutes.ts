import express, { Request, Response } from "express";
import prisma from "../db/prisma";
import bcrypt from "bcryptjs";
import {
  userRegisterSchema,
  userSigninValidation,
} from "../components/validation/schemaValidation";
import jwt from "jsonwebtoken";

// router
const router = express.Router();

// user will register from this route
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  const userData = userRegisterSchema.safeParse(req.body);

  // data validation check
  if (!userData.success) {
    return res.status(400).json({
      message: "data send is not in the right format",
      success: false,
      Error: userData.error,
    });
  }

  try {
    // if the user already exists
    const userFound = await prisma.user.findUnique({
      where: { uemail: userData.data.uemail },
    });

    // if there is user with this email it will send the error
    if (userFound) {
      return res.status(400).json({
        success: false,
        message: "user with this email already signed in",
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(userData.data.password, 10);

    userData.data.password = hashedPassword;

    // data is stored in the user model
    const user = await prisma.user.create({
      data: userData.data,
    });

    return res.status(200).json({
      message: "user created successfull",
      success: true,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "failed to create user", success: false, Error: err });
  }
});

// user will signin from this route
router.post("/signin", async (req: Request, res: Response): Promise<any> => {
  const userData = userSigninValidation.safeParse(req.body);

  if (!userData.success) {
    return res.status(400).json({
      message: "data send is not in the right format",
      success: false,
      Error: userData.error,
    });
  }

  try {
    // check fort the user
    const userFound = await prisma.user.findUnique({
      where: { uemail: userData.data.uemail },
    });

    // if not found
    if (!userFound) {
      return res
        .status(400)
        .json({ message: "user with this not exists", success: false });
    }

    // create token
    const token = jwt.sign(
      { uemail: userData.data.uemail },
      process.env.JWT_KEY as string,
      {
        expiresIn: "7d",
      }
    );

    console.log(token);

    return res
      .status(200)
      .json({ message: "Signin successfully", success: true, token: token });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "failed to create user", success: false, Error: err });
  }
});

export default router;
