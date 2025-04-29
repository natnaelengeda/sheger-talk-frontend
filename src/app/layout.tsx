import type { Metadata } from "next";

// Providers
import Providers from "./provider";

// CSS
import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css';

// Metadata
import { meta } from "../data/metadata";

export const metadata: Metadata = meta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
