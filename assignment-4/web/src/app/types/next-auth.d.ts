import NextAuth, { DefaultSession, DefaultUser, JWT } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: string; // Add the role field
  }

  interface Session extends DefaultSession {
    user: User; // Extend session to include role
  }

  interface JWT extends DefaultJWT {
    role: string; // Add role to JWT token
  }
}
