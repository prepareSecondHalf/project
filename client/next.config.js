import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    // GoogleProvider({
    //   clientId:
    //     "585210393130-jm4ndn6qj6qklv5p8i17vipsn8o6uo4s.apps.googleusercontent.com",
    //   clientSecret: "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",
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // 원하는 소셜 provider를 같은 방식으로 추가
  ],
});
