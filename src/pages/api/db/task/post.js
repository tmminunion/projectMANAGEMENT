import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, status, progress, onprogress, projectId, endDate } = req.body

  const job = await prisma.Task.create({
    data: {
      name,
      status,
      progress,
      onprogress,
      projectId,
      endDate
    },
    include: {
      Job: true
    }
  })

  res.status(201).json(job)
}
