import { Request, Response } from 'express';

export const Index = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: 'Sheger Talk Index Router'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}