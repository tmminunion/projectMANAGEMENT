import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { idnya } = req.body
  const id = parseInt(idnya)

  const job = await prisma.job.findUnique({
    where: { id }
  })

  res.status(201).json(job)
}
