import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "./ui/footer/Footer";
import { AppWrapper } from "@/context";
import Provider from "@/context/Provider";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuscaRepuestos.cl",
  description: "Mesón Digital de Repuestos Automotrices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-WJVH3T2T" />
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WJVH3T2T"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Provider>
          <AppWrapper>
            {children}
            <Footer />
          </AppWrapper>
        </Provider>
      </body>
    </html>
  );
}
