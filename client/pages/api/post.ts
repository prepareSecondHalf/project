import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let name = 'jehyeok';

  console.log('req:::', req);
  res.status(200).json({ name: 'John Doe' });
}
