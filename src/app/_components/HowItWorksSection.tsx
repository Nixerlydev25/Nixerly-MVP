import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"

export default function HowItWorksSection() {
  return (
    <section className="relative bg-white py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-32 -translate-y-1/2 transform bg-nixerly-light-gradient"></div>
      <div className="container mx-auto max-w-7xl relative px-4 md:px-6">
        <div className="animate-slide-up flex flex-col items-center justify-center space-y-4 text-center">
          <div className="mb-2 inline-flex rounded-full bg-nixerly-ultralightblue px-3 py-1 text-sm font-medium text-nixerly-darkblue">
            Getting Started
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter text-nixerly-darkblue sm:text-4xl md:text-5xl">
              Simple Process, Powerful Results
            </h2>
            <p className="mx-auto max-w-[700px] text-nixerly-darkgray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform is designed to be intuitive and efficient for both professionals and businesses.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="professionals" className="mx-auto w-full max-w-4xl">
            <TabsList className="mb-6 grid w-full grid-cols-2 rounded-xl bg-nixerly-ultralightblue p-1">
              <TabsTrigger
                value="professionals"
                className="rounded-lg py-3 transition-all duration-300 data-[state=active]:bg-nixerly-blue data-[state=active]:text-white"
              >
                For Professionals
              </TabsTrigger>
              <TabsTrigger
                value="businesses"
                className="rounded-lg py-3 transition-all duration-300 data-[state=active]:bg-nixerly-blue data-[state=active]:text-white"
              >
                For Businesses
              </TabsTrigger>
            </TabsList>
            <TabsContent value="professionals" className="animate-fade-in mt-6 space-y-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-3 rounded-xl border border-nixerly-lightblue/20 bg-white p-6 text-center shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-2 rounded-full bg-nixerly-blue p-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-nixerly-darkblue">Create Your Profile</h3>
                  <p className="text-nixerly-darkgray">
                    Sign up and build your professional portfolio with your skills and experience.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3 rounded-xl border border-nixerly-lightblue/20 bg-white p-6 text-center shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-2 rounded-full bg-nixerly-blue p-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-nixerly-darkblue">Browse Opportunities</h3>
                  <p className="text-nixerly-darkgray">Explore job listings that match your skills and experience level.</p>
                </div>
                <div className="flex flex-col items-center space-y-3 rounded-xl border border-nixerly-lightblue/20 bg-white p-6 text-center shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-2 rounded-full bg-nixerly-blue p-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-nixerly-darkblue">Apply & Connect</h3>
                  <p className="text-nixerly-darkgray">Apply to jobs and connect directly with construction businesses.</p>
                </div>
              </div>
              <div className="mt-10 flex justify-center">
                <Button className="bg-nixerly-blue shadow-nixerly-button transition-all duration-300 hover:-translate-y-[2px] hover:bg-nixerly-darkblue" asChild>
                  <Link href="/register" className="flex items-center gap-2">
                    Sign Up as a Professional <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="businesses" className="animate-fade-in mt-6 space-y-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-3 rounded-xl border border-nixerly-lightblue/20 bg-white p-6 text-center shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-2 rounded-full bg-nixerly-coral p-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-nixerly-darkblue">Create Company Profile</h3>
                  <p className="text-nixerly-darkgray">
                    Set up your business profile and showcase your company and projects.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3 rounded-xl border border-nixerly-lightblue/20 bg-white p-6 text-center shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-2 rounded-full bg-nixerly-coral p-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-nixerly-darkblue">Post Job Listings</h3>
                  <p className="text-nixerly-darkgray">
                    Create detailed job listings with required skills and qualifications.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3 rounded-xl border border-nixerly-lightblue/20 bg-white p-6 text-center shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-2 rounded-full bg-nixerly-coral p-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-nixerly-darkblue">Review & Hire</h3>
                  <p className="text-nixerly-darkgray">
                    Review applications from qualified professionals and make hiring decisions.
                  </p>
                </div>
              </div>
              <div className="mt-10 flex justify-center">
                <Button className="bg-nixerly-coral shadow-nixerly-button transition-all duration-300 hover:-translate-y-[2px] hover:bg-nixerly-darkcoral" asChild>
                  <Link href="/register" className="flex items-center gap-2">
                    Sign Up as a Business <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
} 