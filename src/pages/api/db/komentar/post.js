import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { authorId, nama, title, content, projectId } = req.body
  console.log(req.body)

  const job = await prisma.Post.create({
    data: {
      authorId,
      nama,
      title,
      content,
      projectId,
      published: true
    }
  })

  console.log(job)
  res.status(201).json(job)
}
