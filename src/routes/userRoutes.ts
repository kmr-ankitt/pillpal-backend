import express, { Request, Response } from "express";
import prisma from "../db/prisma";

const router = express.Router();

// user will register from this route
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  const userData = req.body;

  try {
    const user = await prisma.user.create({
      data: userData,
    });

    console.log(user);

    return res.status(200).json({
      message: "user created successfull",
      success: true,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "failed to create user", success: false });
  }
});

export default router;

// bcrypt password
// signin route, token (jsonwebtoken)
//
