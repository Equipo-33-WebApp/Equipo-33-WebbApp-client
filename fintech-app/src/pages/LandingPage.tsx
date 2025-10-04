// ==================== src/pages/LandingPage.tsx ====================
import { Features } from "@/components/sections/Feactures";
import { CallToAction } from "../components/sections/CallToAction";

import { Pricing } from "@/components/sections/Pricing";
import { Hero } from "../components/sections/Hero";
import { Testimonials } from "../components/sections/Testimonials";

export const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CallToAction />
      </main>
    </div>
  );
};
