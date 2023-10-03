import express, { Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../../middlewares";
import { findUserById, getAllHoldingsByUserId, getAllTransactionsByUserId } from "./users.services";
import { omit } from "lodash";

const router = express.Router();

interface CustomRequest extends Request {
  payload?: {
    userId: string;
  };
}

router.get(
  "/profile",
  isAuthenticated,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.payload!;
      const user = await findUserById(userId);
      res.json(omit(user, "password"));
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/holdings",
  isAuthenticated,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.payload!;

      const holdings = await getAllHoldingsByUserId(userId);

      res.json({ holdings: holdings });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/transactions",
  isAuthenticated,
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.payload!;

      const transactions = await getAllTransactionsByUserId(userId);

      res.json({ transactions: transactions });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
