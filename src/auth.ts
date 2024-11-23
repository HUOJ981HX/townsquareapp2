import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "@/lib/prisma";
import Google from "next-auth/providers/google";
import { AccountType } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth(
    {
        session: {
            strategy: "jwt"
        },
        callbacks: {
            // Augment JWT token with user ID
            async jwt({ token, user, account, profile }: any) {
                // Only runs during initial sign in
                if (user) {
                    // For credentials provider, user object comes directly from your authorize callback
                    if (account?.type === "credentials") {
                        token.id = user.id;
                        token.name = user.username;
                        token.email = user.email;
                    }
                    // For OAuth (Google) provider, we need to look up or create the user
                    else if (token.email) {
                        const dbUser = await prisma.user.findFirst({
                            where: {
                                AND: [
                                    { email: token.email },
                                    { accountType: AccountType.Google }
                                ],
                            },
                            select: {
                                id: true,
                                username: true,
                            },
                        });
                        if (dbUser) {
                            token.id = dbUser.id;
                            token.name = dbUser.username;
                        }
                        else {
                            const newUser = await prisma.user.create({
                                data: {
                                    publicId: uuidv4(), username: token.name, email: token.email, accountType: AccountType.Google
                                }
                            })

                            token.id = newUser.id
                            token.name = newUser.username
                        }
                    }
                }
                return token
            },
            // Add ID to the session object
            async session({ session, token }) {
                console.log('sssssssssssssssssssssssss');
                console.log('sssssssssssssssssssssssss');

                console.log('sean_log: session: ' + JSON.stringify(session));
                console.log('sean_log: token: ' + JSON.stringify(token));
                if (session.user) {
                    session.user.id = token.id as any
                }
                return session
            }
        },
        providers: [
            Credentials({
                credentials: {
                    email: {},
                    password: {},
                },
                authorize: async (credentials) => {
                    console.log("222_credentials");
                    console.log(JSON.stringify(credentials));

                    const user = await prisma.user.findFirst({
                        where: {
                            email: credentials.email as string,
                            accountType: AccountType.Email
                        },
                    });

                    if (!user) {
                        throw new Error('No user found');
                    }

                    const validPassword = user.password === credentials.password ? true : false;

                    if (!validPassword) {
                        throw new Error('Wrong email or password');
                    }

                    console.log("goood?");

                    return { email: user.email, username: user.username, id: user.id } as any;
                },
            }),
            Google({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                authorization: {
                    params: {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code",
                    },
                },
            })
        ],
        // callbacks: {
        //     async jwt({ token, user }) {
        //         if (user) {
        //             token.id = user.id;
        //             token.username = user.username;
        //         }
        //         return token;
        //     },
        //     async session({ session, token }) {
        //         session.user.id = token.id;
        //         session.user.username = token.username;
        //         return session;
        //     }
        // },
    }
)