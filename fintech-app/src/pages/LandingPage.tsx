// ==================== src/pages/LandingPage.tsx ====================
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";

import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { CallToAction } from "@/components/landing/CallToAction";

export const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};
