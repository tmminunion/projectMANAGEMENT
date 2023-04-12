import { signOut } from 'next-auth/react'

export default async function handler(req, res) {
  try {
    await signOut({ req })
    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal melakukan logout' })
  }
}
