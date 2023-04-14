import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { id, name, progress, onprogress, projectId } = req.body

  const job = await prisma.Job.update({
    where: {
      id: Number(id)
    },
    data: {
      progress,
      onprogress
    }
  })
  console.log('job update', job)

  const log = await prisma.Catatan.create({
    data: {
      title: job.name,
      nama: 'success',
      content: `Tugas diselesaikan ${job.name}`,
      projectId,
      authorId: 'up'
    }
  })
  console.log('catatan dibuat', log)
  res.status(201).json(job)
}
