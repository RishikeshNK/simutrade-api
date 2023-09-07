import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

// const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/api/healthcheck", async (req: Request, res: Response) => {
  res.status(200).send({ message: "SimuTrade API is healthy" });
});

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
