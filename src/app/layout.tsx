import type { Metadata } from "next";
import "./globals.css";
import SignOutButton from "./components/SignOutButton";
import { ErrorProvider } from '@/context/ErrorContext';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorProvider>
          <SignOutButton />
          {children}
          <Toaster />
        </ErrorProvider>
      </body>
    </html>
  );
}
