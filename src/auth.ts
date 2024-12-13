import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import Google from "next-auth/providers/google";
import { AccountType } from "@/types/filter";
import { v4 as uuidv4 } from "uuid";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Augment JWT token with user ID
    async jwt({ token, user, account, profile }: any) {
      // console.log("jjjjjjjjjjjjjjjjjjj");
      // console.log("jjjjjjjjjjjjjjjjjjj");
      // console.log("jjjjjjjjjjjjjjjjjjj");
      // console.log("jjjjjjjjjjjjjjjjjjj");
      // console.log('sean_log user: ' + JSON.stringify(user));

    //   console.log("sean_log user: " + JSON.stringify(user)); // {"email":"alice@alice.alice","username":"Alice","id":"1","privateId":1}
    //   console.log("sean_log account: " + JSON.stringify(account)); // {"providerAccountId":"1","type":"credentials","provider":"credentials"}
      // Only runs during initial sign in
      if (user) {
        // For credentials provider, user object comes directly from your authorize callback
        if (account?.type === "credentials") {
          token.id = user.id;
          token.name = user.username;
          token.email = user.email;
          token.privateId = user.privateId;
        }
        // For OAuth (Google) provider, we need to look up or create the user
        else if (token.email) {
          const dbUser = await prisma.user.findFirst({
            where: {
              AND: [
                { email: token.email },
                { accountType: AccountType.Google },
              ],
            },
            // select: {
            //     id: true,
            //     username: true,
            // },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.name = dbUser.username;
            // token.privateId = dbUser.privateId;
          } else {
            const newUser = await prisma.user.create({
              data: {
                username: token.name,
                email: token.email,
                accountType: AccountType.Google,
              },
            });

            token.id = newUser.id;
            token.name = newUser.username;
            // token.privateId = newUser.privateId;
          }
        }
      }
      return token;
    },
    // Add ID to the session object
    async session({ session, token }: any) {
      if (session.user) {
        console.log('ttttttttttttttttttt');
        console.log('ttttttttttttttttttt');
        console.log('sean_log token.id: ' + JSON.stringify(token.id));
        console.log('sean_log token.id: ' + token.id);
        session.user.id = parseInt(token.id);
        // session.user.id = 8;
        // session.user.privateId = token.privateId;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
            accountType: AccountType.Email,
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const validPassword =
          user.password === credentials.password ? true : false;

        if (!validPassword) {
          throw new Error("Wrong email or password");
        }

        if (user && validPassword) {
          return {
            email: user.email,
            username: user.username,
            id: user.id,
            // privateId: user.privateId,
          } as any;
        }

        return null;
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
    }),
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
});
