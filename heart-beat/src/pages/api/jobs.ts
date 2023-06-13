import { NextApiRequest, NextApiResponse } from 'next';
import { generateJobs } from '../../utils/seedJobs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const jobs = generateJobs(10);  // generate jobs data
    res.status(200).json(jobs);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}