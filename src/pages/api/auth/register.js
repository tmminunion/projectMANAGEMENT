import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, noreg, password } = req.body

  if (!name || !email || !noreg || !password) {
    return res.status(400).json({ message: 'Semua field harus diisi' })
  }

  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        noreg,
        password: hashedPassword
      }
    })

    return res.status(201).json({ message: 'User berhasil dibuat!', user: newUser })
  } catch (error) {
    return res.status(500).json({ message: 'Gagal membuat user', error })
  }
}
