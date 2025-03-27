import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";

const app = express(); // app

app.use(express.json());

main(); // listening

app.get("/", (req: Request, res: Response) => {
  res.send("hii this side server");
});

function main() {
  app.listen(3000, () => {
    console.log("server is listening");
  });
}

app.use("/user", userRoutes);
