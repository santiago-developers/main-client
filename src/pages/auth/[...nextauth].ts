import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "santiago-53bf7",
      clientSecret: "AIzaSyCXVpySw0yumalvoKCJh7UFQgnQPRBz9bU",
    }),
  ],
  pages: {
    signIn: "/auth/sign-in"
  }
};

export default NextAuth(authOptions);