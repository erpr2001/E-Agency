import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { MongoClient } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

// Define custom User type extending NextAuth's User type
interface CustomUser {
  id: string; // Mongo ObjectId will be converted to string
  name: string;
  email: string;
  role: string; // Ensure role is correctly typed
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null; // Handle case where credentials are undefined
        }

        const client = await clientPromise;
        const usersCollection = client.db().collection('users');

        // Find user by email
        const user = await usersCollection.findOne({ email: credentials.email });

        // If user is found and password matches
        if (user && await compare(credentials.password, user.password)) {
          const { _id, name, email, role } = user;

          // Ensure role is defined, if not, default to 'user'
          const userRole = role || 'user'; // Fallback to 'user' if role is undefined or missing

          // Return a custom user object
          return {
            id: _id.toString(), // Convert ObjectId to string
            name,
            email,
            role: userRole, // Use the role (either from the DB or fallback)
          };
        }
        return null; // Return null if credentials are incorrect
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Pass role to JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string; // Assign role to session
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Custom sign-in page
  },
});
