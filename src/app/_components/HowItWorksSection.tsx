import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye, Lightbulb, Users } from "lucide-react"

export default function HowItWorksSection() {
  return (
    <section className="relative bg-primary py-20 md:py-28">
      <div className="container mx-auto max-w-7xl relative px-4 md:px-6">
        <div className="animate-slide-up flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex justify-center mb-4">
          </div>
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Simple Process Powerful Results
          </h2>
          <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our platform is designed to be intuitive and efficient for both professionals and businesses.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative flex flex-col space-y-4 rounded-2xl bg-white p-8 text-left shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-between">
              <Image src="/eye.svg" alt="eye" width={112} height={112}/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Create Your Profile</h3>
              <p className="text-gray-600 leading-relaxed mb-20">
                Sign up and build your professional portfolio with your skills and experience.
              </p>
              <div className="flex justify-end pt-4">
                <div className="bg-slate-100 rounded-full w-10 h-10 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            <div className="group relative flex flex-col space-y-4 rounded-2xl bg-white p-8 text-left shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-between">
              <Image src="/hand.svg" alt="eye" width={112} height={112}/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Browse Opportunities</h3>
              <p className="text-gray-600 leading-relaxed mb-20">
                Explore job listings that match your skills and experience level.
              </p>
              <div className="flex justify-end pt-4">
                <div className="bg-slate-100 rounded-full w-10 h-10 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            <div className="group relative flex flex-col space-y-4 rounded-2xl bg-[#FFFFFF] p-8 text-left shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-between">
              <Image src="/touch.svg" alt="eye" width={112} height={112}/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Apply & Connect</h3>
              <p className="text-gray-600 leading-relaxed mb-20">
                Apply to jobs and connect directly with construction businesses.
              </p>
              <div className="flex justify-end pt-4">
                <div className="bg-slate-100 rounded-full w-10 h-10 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="bg-white not-last-of-type text-primary hover:bg-blue-50 shadow-sm px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-[2px]"
              asChild
            >
              <Link href="/register" className="flex items-center gap-2 text-sm">
                Sign up for Professional
              </Link>
            </Button>
            <Button
              className="text-white border border-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-[2px]"
              asChild
            >
              <Link href="/register" className="flex items-center gap-2">
                Sign up for Business
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
