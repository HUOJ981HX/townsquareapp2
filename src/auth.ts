import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "@/libs/prisma";
import Google from "next-auth/providers/google";

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth(
    {
        session: {
            strategy: "jwt"
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

                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
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


                    return { email: user.email, username: user.username };
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

