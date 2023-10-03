import express, { Request, Response, NextFunction } from "express";
import { getAllStocks } from "./stocks.services";

const router = express.Router();

router.get(
  "/all",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allStocks = await getAllStocks();

      res.json({ stocks: allStocks });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
