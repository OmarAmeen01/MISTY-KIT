import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        return false;
      }
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email
          }
        })

        if(existingUser){
          return true;
        }

        await prisma.user.create({
          data : {
            email : user.email,
            name : user.name,
            image : user.image,
            userAuthId : user.id,
          }
        })
        return true;
      }
      catch(error) {
        console.log('there has been some error on our side ' + error)
      return false;
      }
    }
  }

})
