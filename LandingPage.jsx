import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Marketplace } from './components/Marketplace';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function CompanyLandingPage() {
  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <Navbar />
      <main>
        <Hero />
        <section id="features">
          <Features />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="marketplace">
          <Marketplace />
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}