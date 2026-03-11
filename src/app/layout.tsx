import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/contexts/LocaleContext";

export const metadata: Metadata = {
  title: "Open Worship | The essence of worship unchanged, preparation deeper and faster",
  description:
    "Open Worship does not replace worship. We simplify the complex preparation process so you can focus more deeply on the essence of worship—as your worship preparation partner.",
  openGraph: {
    title: "Open Worship | Worship preparation partner",
    description:
      "The essence of worship unchanged, preparation deeper and faster. Join Open Worship.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
