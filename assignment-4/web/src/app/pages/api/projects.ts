import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

let projects = [
  { id: '1', name: 'Project A' },
  { id: '2', name: 'Project B' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(projects);
      break;
    case 'POST':
      const newProject = { id: uuidv4(), name: req.body.name };
      projects.push(newProject);
      res.status(201).json(newProject);
      break;
    case 'PUT':
      const { id } = req.query;
      const index = projects.findIndex(p => p.id === id);
      if (index > -1) {
        projects[index] = { ...projects[index], ...req.body };
        res.status(200).json(projects[index]);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
      break;
    case 'DELETE':
      const projectId = req.query.id as string;
      projects = projects.filter(p => p.id !== projectId);
      res.status(200).json({ message: 'Project deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}