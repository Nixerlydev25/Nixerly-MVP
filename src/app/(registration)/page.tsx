import HeroSection from "../_components/HeroSection"
import FeaturesSection from "../_components/FeaturesSection"
import HowItWorksSection from "../_components/HowItWorksSection"
import TestimonialsSection from "../_components/TestimonialsSection"
import CTASection from "../_components/CTASection"
import Stats from "../_components/Stats"
import Faq from "../_components/Faq"
import Contact from "../_components/Contact"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Stats/>
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <Faq/>
      <Contact/>
    </>
  )
}