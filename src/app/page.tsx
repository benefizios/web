import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Pillars from "@/components/site/Pillars";
import HowItWorks from "@/components/site/HowItWorks";
import BenefitsLocked from "@/components/site/BenefitsLocked";
import Referrals from "@/components/site/Referrals";
import Features from "@/components/site/Features";
import Faq from "@/components/site/Faq";
import Waitlist from "@/components/site/Waitlist";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Pillars />
        <HowItWorks />
        <BenefitsLocked />
        <Referrals />
        <Features />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
