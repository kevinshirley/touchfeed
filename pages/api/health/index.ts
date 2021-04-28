import { NextApiRequest, NextApiResponse } from 'next';

const Health = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({
      success: true,
      message: 'API is healty!',
    })
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message })
  }
};

export default Health;
