import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProvider from "@/components/providers/query-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";
import { metadataHelper } from "@/lib/metadata";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "thai"],
});

export const metadata = metadataHelper({
  title: "Ecomerce",
  description: "Ecomerce แพลตฟอร์ม",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          kanit.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
