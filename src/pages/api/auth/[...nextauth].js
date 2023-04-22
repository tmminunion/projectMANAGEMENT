import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export default NextAuth({
  session: {
    strategy: 'jwt'
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        noreg: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(process.env.LINK_LOGIN, credentials)
          const user = response.data
          console.log('login User = ', user, response.status)
          if (response.status === 200) {
            return {
              id: user.data.id,
              name: user.data.nama,
              noreg: user.data.noreg,
              email: user.data.noreg,
              token: user.data.token,
              role: 'user'
            }
          } else {
            // Jika response status code bukan OK (tidak 200), login gagal
            return null
          }
        } catch (error) {
          // Tangani error yang terjadi saat panggilan API
          console.error(error)

          return null
        }
      }
    })
  ],
  pages: {
    // signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '?error=', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users wil
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        token
      }
    },
    async jwt({ token, user }) {
      if (user) {
        return user
      }

      return token
    }
  },
  secret: process.env.JWT_SECRET
})
