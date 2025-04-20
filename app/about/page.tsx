import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Users, Building2, Award, BadgeCheck, Briefcase } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-nixerly-gradient relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-pattern bg-repeat opacity-10"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-2">
              Transforming Construction Recruitment
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              About Nixerly
            </h1>
            <p className="mx-auto max-w-[700px] text-white/90 md:text-xl/relaxed">
              Building the future of construction recruitment in Ireland.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="bg-nixerly-light-gradient py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6 animate-slide-up">
              <div className="inline-flex px-3 py-1 rounded-full bg-nixerly-ultralightblue text-nixerly-darkblue text-sm font-medium mb-2">
                Our Journey
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-nixerly-darkblue">Our Story</h2>
              <p className="text-nixerly-darkgray md:text-lg/relaxed">
                Nixerly was founded to address the critical labor shortage in the Irish construction industry. With 73%
                of construction companies citing access to skilled labor as their #1 challenge, we recognized the need
                for a specialized platform that connects construction professionals with businesses efficiently and
                effectively.
              </p>
              <p className="text-nixerly-darkgray md:text-lg/relaxed">
                Our mission is to bridge the gap between talented construction professionals and the businesses that
                need them, helping to address Ireland's housing and infrastructure challenges through better workforce
                connections.
              </p>
              <div className="pt-2">
                <Button className="bg-nixerly-blue hover:bg-nixerly-darkblue shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]" asChild>
                  <Link href="/register" className="flex items-center gap-2">
                    Join Our Mission <Award className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center animate-fade-in">
              <div className="bg-white p-6 rounded-xl shadow-nixerly-card transform transition-transform duration-500 hover:translate-y-[-5px]">
                <Image
                  src="/bustling-city-construction.png"
                  alt="Construction site"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover"
                />
                <div className="absolute -top-4 -left-4 bg-nixerly-blue text-white p-3 rounded-lg shadow-lg text-sm font-semibold">
                  Since 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 relative">
        <div className="absolute top-0 inset-x-0 h-32 bg-nixerly-light-gradient transform -translate-y-1/2"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-8 md:grid-cols-3 items-center justify-center">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Users className="h-12 w-12 text-nixerly-coral mb-4" />
              <h3 className="text-3xl font-bold text-nixerly-darkblue mb-2">10,000+</h3>
              <p className="text-nixerly-darkgray">Registered Professionals</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Building2 className="h-12 w-12 text-nixerly-blue mb-4" />
              <h3 className="text-3xl font-bold text-nixerly-darkblue mb-2">500+</h3>
              <p className="text-nixerly-darkgray">Construction Companies</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Briefcase className="h-12 w-12 text-nixerly-coral mb-4" />
              <h3 className="text-3xl font-bold text-nixerly-darkblue mb-2">2,500+</h3>
              <p className="text-nixerly-darkgray">Jobs Filled</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Benefits Section */}
      <section className="bg-nixerly-ultralightblue py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center animate-slide-up">
            <div className="inline-flex px-3 py-1 rounded-full bg-white text-nixerly-darkblue text-sm font-medium mb-2">
              Why Choose Nixerly
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-nixerly-darkblue">
                Platform Benefits
              </h2>
              <p className="mx-auto max-w-[700px] text-nixerly-darkgray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                How Nixerly benefits both construction professionals and businesses.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 pt-16">
            <div className="rounded-xl border border-nixerly-lightblue/30 bg-white p-8 shadow-nixerly-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="rounded-lg bg-nixerly-ultralightblue p-3 inline-block mb-6">
                <BadgeCheck className="h-8 w-8 text-nixerly-blue group-hover:text-nixerly-coral transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-nixerly-darkblue group-hover:text-nixerly-coral transition-colors duration-300">
                For Construction Professionals
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-nixerly-coral shrink-0 mt-0.5" />
                  <span className="text-nixerly-darkgray">Showcase your skills and experience to potential employers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-nixerly-coral shrink-0 mt-0.5" />
                  <span className="text-nixerly-darkgray">Find consistent work with quality businesses</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-nixerly-coral shrink-0 mt-0.5" />
                  <span className="text-nixerly-darkgray">Build a professional portfolio with verified credentials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-nixerly-coral shrink-0 mt-0.5" />
                  <span className="text-nixerly-darkgray">Connect directly with businesses seeking your specific skills</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-nixerly-coral shrink-0 mt-0.5" />
                  <span className="text-nixerly-darkgray">Manage your availability and job preferences</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button className="bg-nixerly-blue hover:bg-nixerly-darkblue shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]" asChild>
                  <Link href="/register" className="flex items-center gap-2">
                    Register as a Professional <CheckCircle2 className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="rounded-xl border border-nixerly-lightblue/30 bg-white p-8 shadow-nixerly-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="rounded-lg bg-nixerly-ultralightblue p-3 inline-block mb-6">
                <Building2 className="h-8 w-8 text-nixerly-blue group-hover:text-nixerly-coral transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-nixerly-darkblue group-hover:text-nixerly-coral transition-colors duration-300">
                For Construction Businesses
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-nixerly-coral shrink-0 mt-0.5" />
                  <span className="text-nixerly-darkgray">Find verified construction talent quickly and efficiently</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-nixerly-coral shrink-0 mt-0.5" />
                  <span className="text-nixerly-darkgray">Reduce hiring risks with pre-verified professionals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-nixerly-coral shrink-0 mt-0.5" />
                  <span className="text-nixerly-darkgray">Post jobs and receive applications from qualified candidates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-nixerly-coral shrink-0 mt-0.5" />
                  <span className="text-nixerly-darkgray">Streamline your workforce management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 h-5 w-5 text-nixerly-coral shrink-0 mt-0.5" />
                  <span className="text-nixerly-darkgray">Access a database of construction professionals with specific skills</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button className="bg-nixerly-coral hover:bg-nixerly-darkcoral shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]" asChild>
                  <Link href="/register" className="flex items-center gap-2">
                    Register as a Business <CheckCircle2 className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-nixerly-gradient text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern bg-repeat opacity-10"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Join the Nixerly Community?</h2>
              <p className="text-white/90">Connect with the best construction talent and businesses in Ireland.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-nixerly-darkblue hover:bg-white/90 shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white bg-white/10 hover:bg-white/20 transition-all duration-300" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
