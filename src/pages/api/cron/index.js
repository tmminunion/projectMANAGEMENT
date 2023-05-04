import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const projects = await prisma.project.findMany({
      include: { Jobs: true }
    })

    // hitung jumlah job yang onprogress 0 dan 1
    console.log(projects)
    res.status(200).json({ message: 'Data onprogress berhasil diupdate' })
  } else {
    res.status(400).json({ message: 'Method yang diizinkan hanya GET' })
  }
}
