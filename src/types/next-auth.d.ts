// src/types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      privateId?: string; // Make it optional with ?
    } & DefaultSession["user"]
  }

  interface User {
    privateId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    privateId?: string;
  }
}