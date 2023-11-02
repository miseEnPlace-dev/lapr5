import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { ISessionDTO } from '@/dto/ISessionDTO';

const attachCurrentSession = async (
  req: Request & { session: ISessionDTO },
  res: Response,
  next: NextFunction
) => {
  const session = jwt.decode(req.headers.authorization?.split(' ')[1] as string) as ISessionDTO;
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  req.session = session;
  next();
};

export default attachCurrentSession;
