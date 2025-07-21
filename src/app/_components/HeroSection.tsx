import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24 relative overflow-hidden">
      {/* Left decorative boxes */}
      <div className="absolute left-40 top-0 w-72 h-72 opacity-40">
        <Image src="/boxleft.svg" alt="" width={128} height={128} className="w-full h-full" />
      </div>

      {/* Right decorative boxes */}
      <div className="absolute left-210 -bottom-28 -translate-y-1/2 w-96 h-72 opacity-60">
        <Image src="/rightbox.png" alt="rightboxes" width={160} height={160} className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            {/* Trust Badge with Avatars */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <Image src="/people.svg" alt="people" width={100} height={100} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-black">The Future of Construction Networking</span>
                <div className="flex items-center gap-1">
                  <Image src="/stars.svg" alt="star" width={100} height={100} />
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl font-normal tracking-tight text-gray-900 sm:text-5xl md:text-3xl lg:text-5xl leading-14">
                Show Your Skill and  
                <br />
                <span className="text-nixerly-blue font-semibold text-5xl">Get Hired!</span>
                
              </h1>
              <p className="max-w-[600px] text-lg text-gray-600 leading-relaxed">
             Every day you create something powerful: clean welds, tight finishes, smart solutions. Now it's time to show the world what you're capable of and get the recognition you deserve.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="bg-nixerly-blue text-white px-6 py-3 text-base font-semibold rounded-full"
                asChild
              >
                <Link href="/register">Get Started</Link>
              </Button>
              <Button
                variant="link"
                size="lg"
                className="text-gray-600 px-6 py-3 text-base font-medium border-1 border-gray-300 rounded-full hover:no-underline"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            {/* Additional decorative boxes behind the image */}
            <div className="absolute -left-8 top-8 w-24 h-24 opacity-20">
              <Image src="/boxleft.svg" alt="" width={96} height={96} className="w-full h-full" />
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/collaborative-construction-planning.png"
                alt="Construction professionals collaborating on blueprints and project planning"
                width={720}
                height={576}
                className="w-[700px] h-[576px] object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
