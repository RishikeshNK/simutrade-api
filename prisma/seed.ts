import db from "../src/utils/db";

async function createStockData() {
  await db.stock.upsert({
    where: { ticker: "AAPL" },
    update: {},
    create: {
      ticker: "AAPL",
      close: 175.0,
    },
  });

  await db.stock.upsert({
    where: { ticker: "GOOGL" },
    update: {},
    create: {
      ticker: "GOOGL",
      close: 135.0,
    },
  });

  await db.stock.upsert({
    where: { ticker: "TSLA" },
    update: {},
    create: {
      ticker: "TSLA",
      close: 250.0,
    },
  });

  console.log("Stocks seeded successfully.");
}

async function main() {
  await createStockData();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
