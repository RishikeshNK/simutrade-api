import express, { Request, Response, NextFunction } from "express";
import { getAllStocks, getStockQuote } from "./stocks.services";

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

router.post(
  "/quote",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ticker } = req.body;
      if (typeof ticker !== "string") {
        res.status(400)
        throw new Error("Ticker must be a string");
      }

      const stockQuote = await getStockQuote(ticker);

      if (!stockQuote) {
        res.status(400)
        throw new Error(`Error fetching stock quote: Stock with ticker ${ticker} not found.`);
      }

      res.json({ quote: stockQuote });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
