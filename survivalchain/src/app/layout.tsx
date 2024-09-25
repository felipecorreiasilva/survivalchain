import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MainContainer from "@/components/MainContainer";
import ScrollSolution from "@/components/scrollSolution";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Survival Chain",
  description: "Survival Chain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`container mx-auto bg-primary-950`}
      >
        <ScrollSolution />
        <AuthProvider>
        <MainContainer>
        {children}
        </MainContainer>
        </AuthProvider>
      </body>
    </html>
  );
}
