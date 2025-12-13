import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        // Always allow sign in, but try to sync with Sanity
        if (!profile?.id) {
          console.log("No profile ID, allowing sign in anyway");
          return true;
        }

        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: String(profile.id), // Ensure it's a string
          });

        if (!existingUser) {
          console.log("Creating new author in Sanity");
          await writeClient.create({
            _type: "author",
            id: String(profile.id),
            name: user.name || "",
            username: profile.login || profile.email?.split("@")[0] || "",
            email: user.email || "",
            image: user.image || "",
            bio: profile.bio || "",
          });
        } else {
          console.log("Author already exists in Sanity");
        }

        return true;
      } catch (error) {
        // Log error but still allow sign in
        console.error("Error in signIn callback:", error);
        return true; // ALWAYS return true to allow sign in
      }
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
              id: String(profile.id),
            });
          token.id = user?._id || profile.id;
        } catch (error) {
          console.error("Error fetching user in jwt:", error);
          token.id = profile.id;
        }
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
