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
      console.log("jjjjjjjjjjjjjjjjjjj");
      console.log("jjjjjjjjjjjjjjjjjjj");
      console.log("jjjjjjjjjjjjjjjjjjj");
      console.log("jjjjjjjjjjjjjjjjjjj");

      console.log("sean_log user: " + JSON.stringify(user)); // {"email":"alice@alice.alice","username":"Alice","id":"1","privateId":1}
      console.log("sean_log account: " + JSON.stringify(account)); // {"providerAccountId":"1","type":"credentials","provider":"credentials"}
      console.log("sean_log profile: " + JSON.stringify(profile));
      // Only runs during initial sign in
      if (user) {
        // For credentials provider, user object comes directly from your authorize callback
        if (account?.type === "credentials") {
          console.log("zzzzzzzzzzzzzzzzzzzzzzz");
          console.log("1111111111111111111111");
          console.log(
            "sean_log user.privateId: " + JSON.stringify(user.privateId)
          );
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
            console.log("zzzzzzzzzzzzzzzzzzzzzzz");
            console.log("2222222222222222");
            console.log("sean_log dbUser.privateId: " + dbUser.privateId);
            token.privateId = dbUser.privateId;
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
            console.log("zzzzzzzzzzzzzzzzzzzzzzz");
            console.log("2222222222222222");
            console.log(
              "sean_log newUser.privateId: " + JSON.stringify(newUser.privateId)
            );
            token.privateId = newUser.privateId;
          }
        }
      }
      return token;
    },
    // Add ID to the session object
    async session({ session, token }) {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
      console.log("sean_log session: " + JSON.stringify(session));
      console.log("sean_log session: " + JSON.stringify(token));
      if (session.user) {
        session.user.id = token.id as any;
        session.user.privateId = "token.privateId";
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

        console.log('uuuuuuuuuuuuuuuuuuuuu');
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
        console.log('sean_log user: ' + JSON.stringify(user));

        const validPassword =
          user.password === credentials.password ? true : false;

        if (!validPassword) {
          throw new Error("Wrong email or password");
        }

        if (user && validPassword) {
            console.log('uuuuuuuuuuuuuuuuuuuuu');
            console.log('vvvvvvvvvvvvvvvvvvv');
          return {
            email: user.email,
            username: user.username,
            id: user.id,
            privateId: user.privateId,
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
