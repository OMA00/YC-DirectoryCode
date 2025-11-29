// app/components/Navbar.jsx or app/components/Navbar.tsx
// This file does not need "use client" and runs on the server.

// No need to import React from "react" in Next.js Server Components
import Link from "next/link";
import Image from "next/image";
// Import server-side functions for session and actions
import { auth, signOut, signIn } from "@/auth";
// Note: signIn/signOut must be wrapped in a server action or anonymous function
// when used in a client component, but here they are used within a form/button
// which is the common pattern for Server Components.

// Component is declared async and uses await, making it a Server Component
const Navbar = async () => {
  // 1. Await the session on the server
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={38} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {/* 2. Check the session data */}
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              {/* 3. Logout Form (Server Action pattern) */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span>Logout</span>
                </button>
              </form>

              {/* Assuming session.user.id or another unique ID exists */}
              <Link href={`/users/${session.user.id || "profile"}`}>
                {session.user.name}
              </Link>
            </>
          ) : (
            <>
              {/* 4. Login Form (Server Action pattern) */}
              <form
                action={async () => {
                  "use server";
                  // Pass the provider name to signIn
                  await signIn("github");
                }}
              >
                <button type="submit">
                  <span>Login</span>
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
