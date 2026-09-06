import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://benefizios.com"),
  title: {
    default: "Benefizios — Tu decisión inteligente",
    template: "%s · Benefizios",
  },
  description:
    "La membresía que te da descuentos de uso cotidiano en estacionamiento, restaurantes, entretenimiento y más. Sin compras online, fáciles de redimir.",
  keywords: [
    "descuentos",
    "membresía",
    "beneficios",
    "México",
    "cupones",
    "promociones",
  ],
  openGraph: {
    title: "Benefizios — Tu decisión inteligente",
    description:
      "La membresía que te da descuentos de uso cotidiano. Sin compras online, fáciles de redimir.",
    type: "website",
    locale: "es_MX",
    siteName: "Benefizios",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benefizios — Tu decisión inteligente",
    description:
      "La membresía que te da descuentos de uso cotidiano. Sin compras online, fáciles de redimir.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
