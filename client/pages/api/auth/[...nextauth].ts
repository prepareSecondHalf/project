import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface DataType {
  clientId: string;
  clientSecret: string;
}
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as DataType),
    // 원하는 소셜 provider를 같은 방식으로 추가
  ],
});
