import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-nixerly-gradient py-20 md:py-32">
      <div className="absolute inset-0 bg-pattern bg-repeat opacity-10"></div>
      <div className="container mx-auto max-w-7xl relative px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-in space-y-6">
            <div className="mb-2 inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white">
              The Future of Construction Networking
            </div>
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
              Connecting Construction Talent with Opportunity
            </h1>
            <p className="max-w-[600px] text-white/90 leading-relaxed md:text-xl">
              The premier platform for construction professionals and businesses to connect, collaborate, and build
              the future together.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-nixerly-darkblue shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px] hover:bg-white/90" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-white/10 text-white transition-all duration-300 hover:bg-white/20"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white transition-all hover:bg-white/30">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Trusted by 500+ Companies
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white transition-all hover:bg-white/30">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> 10,000+ Professionals
              </Badge>
            </div>
          </div>
          <div className="relative animate-fade-in lg:block">
            <div className="transform rounded-xl bg-white p-6 shadow-nixerly-card transition-transform duration-500 hover:translate-y-[-5px]">
              <Image
                src="/collaborative-construction-planning.png"
                alt="Construction professionals collaborating on a project"
                width={600}
                height={400}
                className="mx-auto rounded-lg object-cover"
                priority
              />
              <div className="absolute -bottom-4 -right-4 rounded-lg bg-nixerly-coral-gradient p-3 text-sm font-semibold text-white shadow-lg">
                Join Today
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 