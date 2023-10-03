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

export { getAllStocks };
