import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const projects = await prisma.project.findMany({
      include: { Jobs: true }
    })

    // hitung jumlah job yang onprogress 0 dan 1
    projects.forEach(async project => {
      let onProgressZero = 0
      let onProgressOne = 0

      project.Jobs.forEach(job => {
        if (job.onprogress === 0) {
          onProgressZero++
        } else if (job.onprogress === 1) {
          onProgressOne++
        }
      })
      const persenrasi = ((onProgressOne / (onProgressOne + onProgressZero)) * 100).toFixed(0)

      const update = await prisma.project.update({
        where: { id: project.id },
        data: {
          onprogress: onProgressOne,
          percent: parseInt(persenrasi)
        }
      })
    })

    res.status(200).json({ message: 'Data onprogress berhasil diupdate' })
  } else {
    res.status(400).json({ message: 'Method yang diizinkan hanya GET' })
  }
}
