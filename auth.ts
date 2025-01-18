import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks : {
    authorized({auth, request}) {
      // console.log("callbacks auth 1 ", !!auth)
      // console.log("callbacks auth 2 ", auth)

      console.log(request , " this is request from auth.js")

      return !!auth?.user;
    },
  },
  pages: {
    signIn: '/login'
  }
};

export const {
  auth,
  signIn,
  signOut,
  handlers:{ GET, POST },
} = NextAuth(authConfig);

// handlers : { GET, POST }