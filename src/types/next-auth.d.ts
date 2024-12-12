// src/types/next-auth.d.ts
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
  }
}