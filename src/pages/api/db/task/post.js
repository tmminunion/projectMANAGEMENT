import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, status, progress, onprogress, projectId, endDate, priority } = req.body

  const job = await prisma.Task.create({
    data: {
      name,
      status,
      progress,
      onprogress,
      projectId,
      endDate,
      priority
    },
    include: {
      Job: true
    }
  })

  const log = await prisma.Catatan.create({
    data: {
      title: name,
      nama: 'warning',
      content: `Pekerjaan baru di buat -> ${name}`,
      projectId,
      authorId: 'up'
    }
  })

  res.status(201).json(job)
}
