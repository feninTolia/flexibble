import { getServerSession } from 'next-auth/next';
import { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialProvider from 'next-auth/providers/credentials';
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import { SessionInterface, UserProfile } from '../types';
// import { createUser, getUser } from './actions';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialProvider({
      credentials: {
        email: { label: 'Email', type: 'Email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        console.log('Login credentials - ', credentials);

        return null;
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: 'grafbase',
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  theme: {
    colorScheme: 'light',
    logo: '/logo.svg',
  },
  callbacks: {
    async session({ session }) {
      try {
        // const email = session?.user?.email as string;
        // const data = (await getUser(email)) as { user?: UserProfile };

        const newSession = {
          ...session,
          user: {
            ...session.user,
            // ...data?.user,
          },
        };

        return newSession;
      } catch (error: any) {
        console.error('Error retrieving user data: ', error.message);
        return session;
      }
    },
    async signIn({ user }: { user: User }) {
      try {
        // const userExists = (await getUser(user?.email as string)) as {
        //   user?: UserProfile;
        // };

        // if (!userExists?.user) {
        //   await createUser({
        //     name: user.name as string,
        //     email: user.email as string,
        //     avatarUrl: user.image as string,
        //   });
        // }

        return true;
      } catch (error: any) {
        console.error('Error checking if user exists: ', error.message);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
