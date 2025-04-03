import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default NextAuth({
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error('Email dan password harus diisi!')
        }

        // Cari user di database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          throw new Error('User tidak ditemukan!')
        }

        // Cek password
        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Password salah!')
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          noreg: user.noreg
        }
      }
    })
  ],

  callbacks: {
    async session({ session, token }) {
      session.user = token
      
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.noreg = user.noreg
      }

      return token
    }
  },

  secret: process.env.JWT_SECRET
})
