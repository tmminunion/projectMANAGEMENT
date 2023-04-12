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
      credentials: {},
      async authorize(credentials, req) {
        try {
          const response = await axios.post(process.env.LINK_LOGIN, credentials)
          const user = response.data
          if (response.status === 200) {
            return {
              id: user.data.id,
              name: user.data.nama,
              noreg: user.data.noreg,
              email: user.data.noreg,
              token: user.data.token
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
    error: '/pages/login?error=', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users wil
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role
      }

      // return final_token
      return params.token
    }
  },
  secret: process.env.JWT_SECRET
})
