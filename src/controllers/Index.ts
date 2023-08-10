import { Request, Response } from 'express';
import database from '../database/database';
export const Index = async (req: Request, res: Response) => {
  try {
    await database.authenticate();

    await database.sync({ alter: true });
    res.status(200).json({
      message: 'Sheger Talk Index Router',
      database: 'Database connected successfully'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}