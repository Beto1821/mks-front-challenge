import type { Metadata } from "next";
import "./css/globals.sass";

export const metadata: Metadata = {
  title: "mks-frontend-challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
