import express, { type Request, type Response } from "express";
import cors from "cors";
import { userValidation, userValidationSignup } from "./auth";
import { userModel } from "./db";
import jwt from "jsonwebtoken";
import { Keypair } from "@solana/web3.js";

const app = express();
const PORT = 3000;
const pvtKey = "ksimon";

app.use(express.json());
app.use(cors());

app.post(
  "/api/v1/signup",
  userValidation,
  userValidationSignup,
  async (req: Request, res: Response) => {
    const { username, password } = req.body();
    const keypair = new Keypair();

    try {
      userModel.create({
        username,
        password,
        publicKey: keypair.publicKey.toString(),
        privateKey: keypair.secretKey.toString(),
      });

      res.status(200).json({
        message: "User created",
        publicKey: keypair.publicKey.toString(),
      });
    } catch (err: any) {
      res.status(500).json({
        message: "User not created, please try later",
      });
    }
  },
);

app.post(
  "/api/v1/signin",
  userValidation,
  async (req: Request, res: Response) => {
    const { username, password } = req.body();

    try {
      const exists = await userModel.findOne({
        username: username,
        password: password,
      });

      if (!exists) {
        res.status(400).json({
          message: "Wrong credentials or user doesn't exist",
        });
      }
      const token = jwt.sign({ id: exists?._id }, pvtKey);
      res.status(200).json({
        message: "Signed in",
        JWT: token,
      });
    } catch (err: any) {
      res.status(500).json({
        message: "Internal Server Issue",
      });
    }
  },
);

app.post("/api/v1/txn/sign", (req: Request, res: Response) => {
  res.json({
    message: "Token signed",
  });
});

app.get("/api/v1/txn", (req: Request, res: Response) => {
  res.json({
    message: "Token",
  });
});

app.listen(PORT, () => {
  console.log(`Runnig on port ${PORT}`);
});
