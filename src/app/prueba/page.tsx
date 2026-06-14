import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import Navbar from "@/components/site/Navbar";
import HowItWorks from "@/components/site/HowItWorks";
import Referrals from "@/components/site/Referrals";
import Footer from "@/components/site/Footer";
import HeroBold from "@/components/prueba/HeroBold";
import LogoStrip from "@/components/prueba/LogoStrip";
import PillarsBold from "@/components/prueba/PillarsBold";
import LockedBenefits from "@/components/prueba/LockedBenefits";
import CtaBold from "@/components/prueba/CtaBold";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prueba · dirección audaz",
  robots: { index: false, follow: false },
};

// Remapea las fuentes de marca a las de esta página (solo aquí).
// Override directo de --font-display/--font-sans: si remapeáramos
// --font-poppins/--font-inter, Tailwind ya los resolvió en :root y el
// valor literal heredado ignoraría el cambio.
const fontVars = {
  "--font-display": "var(--font-bricolage)",
  "--font-sans": "var(--font-hanken)",
} as React.CSSProperties;

export default function PruebaPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} font-sans`}
      style={fontVars}
    >
      <Navbar />
      <main>
        <HeroBold />
        <LogoStrip />
        <PillarsBold />
        <HowItWorks />
        <LockedBenefits />
        <Referrals />
        <CtaBold />
      </main>
      <Footer />
    </div>
  );
}
