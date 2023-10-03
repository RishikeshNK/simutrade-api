import express, { Request, Response, NextFunction } from "express";
import { buyStock, getAllStocks, getStockQuote } from "./stocks.services";
import { isAuthenticated } from "../../middlewares";

interface CustomRequest extends Request {
  payload?: {
    userId: string;
  };
}

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

router.post(
  "/buy",
  isAuthenticated,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.payload!;
      const { ticker, quantity } = req.body;

      if (typeof userId !== "string" || typeof ticker !== "string" || typeof quantity !== "number") {
        res.status(400).json({ error: "Invalid request body." });
        return;
      }

      const result = await buyStock(userId, ticker, quantity);

      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
