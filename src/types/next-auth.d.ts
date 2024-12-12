// src/types/next-auth.d.ts
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      privateId?: number; // Make it optional with ?
    } & DefaultSession["user"]
  }

  interface User {
    privateId?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    privateId?: number;
  }
}