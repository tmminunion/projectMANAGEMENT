import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, description, status, progress, onprogress, priority, startDate, endDate } = req.body
  console.log(req.body)

  const job = await prisma.project.create({
    data: {
      name,
      description,
      status,
      progress,
      onprogress,
      priority,
      startDate,
      endDate
    }
  })

  console.log(job)
  res.status(201).json(job)
}
