import express, { type Request, type Response } from "express";
import cors from "cors";
import { userValidation, userValidationSignup } from "./auth";
import { userModel } from "./db";
import jwt from "jsonwebtoken";
import { Connection, Keypair, Transaction } from "@solana/web3.js";
import bs58 from "bs58";

const app = express();
const PORT = 3000;
const pvtKey = "ksimon";
const connection = new Connection("https://api.devnet.solana.com");

app.use(express.json());
app.use(cors());

app.post(
  "/api/v1/signup",
  userValidation,
  userValidationSignup,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const keypair = new Keypair();
    try {
      await userModel.create({
        username,
        password,
        publicKey: keypair.publicKey.toString(),
        privateKey: bs58.encode(keypair.secretKey),
      });
      res.status(200).json({
        message: "User created",
        publicKey: keypair.publicKey.toString(),
      });
    } catch {
      res.status(500).json({ message: "User not created, please try later" });
    }
  },
);

app.post(
  "/api/v1/signin",
  userValidation,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const exists = await userModel.findOne({ username, password });
      if (!exists) {
        res
          .status(400)
          .json({ message: "Wrong credentials or user doesn't exist" });
      }
      //@ts-ignore
      const token = jwt.sign({ id: exists._id }, pvtKey);
      res.status(200).json({ message: "Signed in", JWT: token });
    } catch {
      res.status(500).json({ message: "Internal Server Issue" });
    }
  },
);

// Fixed transaction signing endpoint
app.post("/api/v1/txn/sign", async (req: Request, res: Response) => {
  try {
    console.log("Received transaction signing request:", req.body);

    const { message } = req.body;

    // Check if message and data exist
    if (!message || !message.data) {
      res.status(400).json({ message: "Invalid transaction data" });
    }

    // Convert array back to Buffer and then to Transaction
    const txBuffer = Buffer.from(message.data);
    const tx = Transaction.from(txBuffer);

    console.log("Transaction fee payer:", tx.feePayer?.toString());

    // Find user by public key
    const user = await userModel.findOne({
      publicKey: tx.feePayer?.toString(),
    });

    if (!user || !user.privateKey) {
      console.log("User not found or no private key");
      res.status(404).json({ message: "User or private key not found" });
    }

    //@ts-ignore
    const secretKey = bs58.decode(user.privateKey);
    const signer = Keypair.fromSecretKey(secretKey);

    // Sign the transaction
    tx.sign(signer);

    // Send the transaction
    const sig = await connection.sendRawTransaction(tx.serialize());

    console.log("Transaction sent with signature:", sig);

    res.json({ message: "Transaction signed and sent", signature: sig });
  } catch (err) {
    console.error("Transaction signing error:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err instanceof Error ? err.message : String(err),
    });
  }
});

app.get("/api/v1/txn", (_req: Request, res: Response) => {
  res.json({ message: "Transaction endpoint is working" });
});

// Add a test endpoint to verify server is running
app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.json({
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
});
// 3KPwMsf9TBt7N2fR8q1HXbNRBLqApktR6XAUW9o3UBnz
// GSwpy5nj26wn8PpTGXVpLvwXi3G1J7f7LaEe2TaEZzfj
//
