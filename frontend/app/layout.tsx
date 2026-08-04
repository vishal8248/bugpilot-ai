import "./globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BugPilot AI",
  description: "AI-powered bug analysis and debugging assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <div className="flex min-h-screen">
          <Sidebar />

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}