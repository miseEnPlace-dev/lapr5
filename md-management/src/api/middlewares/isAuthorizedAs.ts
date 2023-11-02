import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { ISessionDTO } from '@/dto/ISessionDTO';

const isAuthorizedAs = async (req: Request, res: Response, next: NextFunction, role: string) => {
  const session = jwt.decode(req.headers.authorization?.split(' ')[1] as string) as ISessionDTO;
  if (!session) return res.status(401).json({ message: 'Token not found' });

  if (session.role !== role) return res.status(403).json({ message: 'Forbidden' });

  next();
};

export default isAuthorizedAs;
