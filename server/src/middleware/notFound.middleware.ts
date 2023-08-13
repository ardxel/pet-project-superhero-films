import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function notFound(req: Request, res: Response) {
  res.status(StatusCodes.NOT_FOUND).json({ success: false, error: 'route does not exist' });
}
