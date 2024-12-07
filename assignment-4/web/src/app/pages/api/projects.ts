import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dataPath = path.join(process.cwd(), 'data', 'projects.json')
  const fileContents = fs.readFileSync(dataPath, 'utf8')
  const data = JSON.parse(fileContents)
  res.status(200).json(data)
}