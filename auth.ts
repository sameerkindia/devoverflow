import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { redirect } from "next/navigation";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks : {
    async authorized({auth, request} : any) {
      return !!auth?.user;

    },
    async session({ session, user } : any){
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users/email?email=${session.user.email}`)

      const data = await response.json()

      session.user.id = data._id;
      session.user.username = data.username

      // console.log(session , "this session Data is from session")
      
      return session;
    },
    // async signIn({ user }) {
    //   try {
    //     const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email: user.email,
    //         name: user.name,
    //         picture: user.image
    //       }),
    //     });

    //     const data = await response.json();

    //     if (!data.success) {
    //       console.error('Failed to save user:', data.error);
    //       return false; // Prevent sign-in if the API fails
    //     }

    //     return true; // Allow sign-in
    //   } catch (error) {
    //     console.error('Sign-in error:', error);
    //     return false;
    //   }
    // },
    // async jwt({ token, user }){

    //   if (user) {
    //     token.id = user.id;
    //     token.username = user.username || null;
    //   }
    //   return token;
    // }
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
