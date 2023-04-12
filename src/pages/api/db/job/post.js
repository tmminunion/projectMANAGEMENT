import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, taskId, status, statustask, progress, onprogress, projectId } = req.body

  const job = await prisma.Job.create({
    data: {
      name,
      taskId,
      status,
      statustask,
      progress,
      onprogress,
      projectId
    }
  })

  res.status(201).json(job)
}
