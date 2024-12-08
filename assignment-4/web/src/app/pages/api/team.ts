import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

let team = [
  { id: '1', name: 'John Doe', role: 'Developer' },
  { id: '2', name: 'Jane Smith', role: 'Designer' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(team);
      break;
    case 'POST':
      const newMember = { id: uuidv4(), ...req.body };
      team.push(newMember);
      res.status(201).json(newMember);
      break;
    case 'PUT':
      const { id } = req.query;
      const index = team.findIndex(m => m.id === id);
      if (index > -1) {
        team[index] = { ...team[index], ...req.body };
        res.status(200).json(team[index]);
      } else {
        res.status(404).json({ message: 'Team member not found' });
      }
      break;
    case 'DELETE':
      const memberId = req.query.id as string;
      team = team.filter(m => m.id !== memberId);
      res.status(200).json({ message: 'Team member deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}