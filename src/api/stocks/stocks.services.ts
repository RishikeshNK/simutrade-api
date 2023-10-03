import db from "../../utils/db";
import { omit } from "lodash";


async function getAllStocks() {
  try {
    const allStocks = await db.stock.findMany();

    return allStocks.map((stock) => omit(stock, 'id'));
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
    
    return omit(stock, 'id');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching stock quote: ${error.message}`);
    }
  }
}

export { getAllStocks, getStockQuote };
