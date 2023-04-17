import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id, endDate, startDate } = req.body

  const job = await prisma.Job.update({
    where: {
      id: Number(id)
    },
    data: {
      startDate,
      endDate,
      statustask: 1
    }
  })

  res.status(201).json(job)
}
