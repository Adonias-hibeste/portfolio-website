import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; // I need to install bcryptjs

async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    pages: {
        signIn: "/admin/login",
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    const parsedCredentials = z
                        .object({ email: z.string().email(), password: z.string().min(6) })
                        .safeParse(credentials);

                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;

                        console.log("Attempting login for:", email);
                        const user = await getUser(email);
                        if (!user) {
                            console.log("User not found");
                            return null;
                        }

                        console.log("User found, verifying password...");
                        const passwordsMatch = await bcrypt.compare(password, user.password);
                        if (passwordsMatch) {
                            console.log("Password match!");
                            return user;
                        }

                        console.log("Invalid password");
                        return null;
                    }

                    console.log("Invalid credentials format");
                    return null;
                } catch (error: any) {
                    console.error("AUTHORIZE ERROR:", error);
                    throw new Error(`Auth Failed: ${error.message}`);
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return session;
        },
        async jwt({ token, user }) {
            return token;
        },
    },
});
