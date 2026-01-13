import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PageMotion } from "@/shared/ui/PageMotion";
import { LoadingProvider } from "@/shared/ui/LoadingProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "DispatchAI",
  description: "Portal local de entregas com tracking em tempo real e IA.",
  icons: {
    icon: "/appIcon_dispatch.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${spaceGrotesk.variable} ${fraunces.variable} bg-amber-50 text-slate-900 antialiased`}
      >
        <LoadingProvider>
          <PageMotion>{children}</PageMotion>
        </LoadingProvider>
      </body>
    </html>
  );
}
