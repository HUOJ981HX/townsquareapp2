import type { Metadata } from "next";
import "./globals.css";
import SignOutButton from "./components/SignOutButton";
import { ErrorProvider } from '@/context/ErrorContext';
import { Toaster } from "@/components/ui/toaster";
import { GlobalProvider } from "@/context/GlobalContext";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  const username = session?.user?.name;

  return (
    <html lang="en">
      <body>
        <ErrorProvider>
          <GlobalProvider>
            <div className="max-w-[800px] w-full m-auto">
              <div className="flex">
                <SignOutButton />
                <p className="pr-8 pl-8">|</p>
                {username}
                <p className="pr-8 pl-8">|</p>
                {session?.user?.id}
              </div>
              {children}
              <Toaster />
            </div>
          </GlobalProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}
