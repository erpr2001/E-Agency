import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const authMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const session = await getSession({ req });
  if (session) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default authMiddleware;