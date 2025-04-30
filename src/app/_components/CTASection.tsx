import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-nixerly-gradient py-20 text-white">
      <div className="absolute inset-0 bg-pattern bg-repeat opacity-10"></div>
      <div className="container mx-auto max-w-7xl relative px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Construction Career?</h2>
            <p className="text-white/90">Join thousands of professionals and businesses on the Nixerly platform today.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="bg-white text-nixerly-darkblue shadow-nixerly-button transition-all duration-300 hover:-translate-y-[2px] hover:bg-white/90" asChild>
              <Link href="/register">Sign Up Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white bg-white/10 text-white transition-all duration-300 hover:bg-white/20" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 