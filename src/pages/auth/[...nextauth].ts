import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOGGLE_CLOUD_CLIENT_ID as string,
      clientSecret: process.env.GOGGLE_CLOUD_SECRET_KEY as string,
    }),
  ],
  pages: {
    signIn: "/auth/sign-in"
  }
};

export default NextAuth(authOptions);