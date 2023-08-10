import { Request, Response } from 'express';
import database from '../database/database';
import Admin from '../models/Admin';
import User from '../models/User';
export const Index = async (req: Request, res: Response) => {
  try {
    await database.authenticate();

    await database.sync({ alter: true });
    await Admin.sync({ alter: true });
    await User.sync({ alter: true });

    res.status(200).json({
      message: 'Sheger Talk Index Router',
      database: 'Database connected successfully'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}