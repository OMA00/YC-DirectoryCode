import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Suspense fallback={<div> Loading Navigation.....</div>}>
        <Navbar />
      </Suspense>

      {children}
    </main>
  );
}
