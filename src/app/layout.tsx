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
      <GoogleTagManager gtmId="GTM-M3DBB38G" />

      <body style={{ fontFamily: 'Arial, sans-serif' }}>
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
