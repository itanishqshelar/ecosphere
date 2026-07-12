import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ValueProposition } from "@/components/landing/ValueProposition";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { WhyEcoSphere } from "@/components/landing/WhyEcoSphere";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { GamificationSection } from "@/components/landing/GamificationSection";
import { ReportingSection } from "@/components/landing/ReportingSection";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { TechSection } from "@/components/landing/TechSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[hsl(var(--background))]">
      <Navbar />
      <main>
        <HeroSection />
        <ValueProposition />
        <ProductShowcase />
        <WorkflowSection />
        <WhyEcoSphere />
        <DashboardPreview />
        <GamificationSection />
        <ReportingSection />
        <SecuritySection />
        <TechSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
