import Credentials from 'next-auth/providers/credentials'

import { axios } from '@/lib/axios'
import { ACCESS_TOKEN_EXP_AUTH_OPTION_IN_MS } from '@/lib/const'
import { refreshAccessToken } from '@/lib/refreshAccessToken'

export const options = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            '/auth/signin',
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          const user = await axios.get('/api/user', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${res.data.accessToken}`,
            },
          })
          const { data } = res

          return {
            id: user.data.id,
            email: user.data.email,
            name: user.data.name,
            role: user.data.roles[0],
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            accessTokenExpires: Date.now() + ACCESS_TOKEN_EXP_AUTH_OPTION_IN_MS,
            verify: data.isVerified,
          }
        } catch (err) {
          // console.log(err)
          // Backend is NOT okay, so we directly throw the error from backend
          const errMessage = err.response
          if (errMessage) {
            throw new Error(JSON.stringify({ message: errMessage.data.message }))
          }
          // Backend is ok, but we have filter something that has to be error (like account not activated)
          else {
            throw new Error(err.message)
          }
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user }) {
      if (user) return true
      return false
    },
    async jwt({ token, user }) {
      // Initial sign in
      // console.log(token, user)

      if (user) {
        return {
          ...token,
          username: user.username,
          role: user.role,
          accessToken: user.accessToken,
          accessTokenExpires: user.accessTokenExpires,
          refreshToken: user.refreshToken,
        }
      }
      if (
        Date.now() > token.accessTokenExpires ||
        token.accessToken === 'RefreshAccessTokenError'
      ) {
        return {
          ...token,
          accessTokenExpires: Date.now() + ACCESS_TOKEN_EXP_AUTH_OPTION_IN_MS, // expand access token expire
          accessToken: await refreshAccessToken(token.refreshToken),
        }
      }

      return token
    },
    async session({ session, token }) {
      console.log(session, token)

      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          role: token.role,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
      }
    },
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
  pages: {
    signIn: '/signin',
    newUser: '/welcome',
  },
}

export default options
