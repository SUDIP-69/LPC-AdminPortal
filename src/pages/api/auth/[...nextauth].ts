import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Demo users
        const users = [
          {
            id: "1",
            email: "admin@example.com",
            name: "Admin User",
            role: "admin",
            password: "password123"
          },
          {
            id: "2",
            email: "manager@example.com",
            name: "Manager User",
            role: "manager",
            password: "password123"
          }
        ];
        const user = users.find(
          u => u.email === credentials?.email && u.password === credentials?.password
        );
        if (user) {
          // Don't return password
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
  },
}) 