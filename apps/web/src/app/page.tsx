import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ecosystem from '@/components/Ecosystem';
import HowItWorks from '@/components/HowItWorks';
import Benefits from '@/components/Benefits';
import Community from '@/components/Community';
import SocialProof from '@/components/SocialProof';
import CustomSolutions from '@/components/CustomSolutions';
import CTAFinal from '@/components/CTAFinal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ecosystem />
        <HowItWorks />
        <Benefits />
        <Community />
        <SocialProof />
        <CustomSolutions />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
