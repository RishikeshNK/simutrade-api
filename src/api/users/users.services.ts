import bcrypt from 'bcrypt';
import db from '../../utils/db';


interface User {
  id: string;
  email: string;
  password: string;
}

async function findUserByEmail(email: string): Promise<User | null> {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

async function createUserByEmailAndPassword({ email, password }: { email: string; password: string }): Promise<User> {
  const hashedPassword = bcrypt.hashSync(password, 12);

  return db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}

async function findUserById(id: string): Promise<User | null> {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

async function getAllHoldingsByUserId(userId: string) {
  try {
    const holdings = await db.holding.findMany({
      where: {
        userId,
      },
      include: {
        stock: true,
      },
    });

    return holdings;
  } catch (error) {
    if (error instanceof Error) throw new Error(`Error fetching holdings: ${error.message}`);
  }
}

async function getAllTransactionsByUserId(userId: string) {
  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
      include: {
        stock: true,
      }
    });

    return transactions;
  } catch (error) {
    if (error instanceof Error) throw new Error(`Error fetching transactions: ${error.message}`);
  }
}

export { findUserByEmail, findUserById, createUserByEmailAndPassword, getAllHoldingsByUserId, getAllTransactionsByUserId };
