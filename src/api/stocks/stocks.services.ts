import { Decimal } from "@prisma/client/runtime/library";
import db from "../../utils/db";
import { omit } from "lodash";

async function getAllStocks() {
  try {
    const allStocks = await db.stock.findMany();

    return allStocks.map((stock) => omit(stock, "id"));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching stocks: ${error.message}`);
    }
  }
}

async function getStockQuote(ticker: string) {
  try {
    const stock = await db.stock.findUnique({
      where: {
        ticker,
      },
    });

    if (!stock) {
      return null;
    }

    return omit(stock, "id");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching stock quote: ${error.message}`);
    }
  }
}

async function buyStock(userId: string, ticker: string, quantity: number) {
  try {
    const stock = await db.stock.findUnique({
      where: { ticker },
    });

    if (!stock) {
      throw new Error(`Stock with ticker ${ticker} not found.`);
    }

    const price = Number(stock.close) * quantity;

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    if (Number(user.funds) < price) {
      throw new Error(
        `Insufficient funds to buy ${quantity} shares of ${ticker}.`
      );
    }

    await db.user.update({
      where: { id: userId },
      data: {
        funds: { decrement: price },
      },
    });

    await db.transaction.create({
      data: {
        userId,
        stockId: stock.id,
        quantity,
        price: stock.close,
        transactionType: "BUY",
      },
    });

    const existingHolding = await db.holding.findFirst({
      where: {
        userId: userId,
        stockId: stock.id,
      },
    });

    if (existingHolding) {
      await db.holding.update({
        where: {
          id: existingHolding.id,
        },
        data: {
          quantity: existingHolding.quantity + quantity,
        },
      });
    } else {
      await db.holding.create({
        data: {
          userId,
          stockId: stock.id,
          quantity,
        },
      });
    }

    return {
      message: `Successfully bought ${quantity} shares of ${ticker}.`,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error buying stock: ${error.message}`);
    }
  }
}

export { getAllStocks, getStockQuote, buyStock };
