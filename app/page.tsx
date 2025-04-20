import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building, HardHat, Calendar, Shield, Award, TrendingUp, CheckCircle2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-nixerly-gradient relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-pattern bg-repeat opacity-10"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-2">
                The Future of Construction Networking
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Connecting Construction Talent with Opportunity
              </h1>
              <p className="max-w-[600px] text-white/90 md:text-xl leading-relaxed">
                The premier platform for construction professionals and businesses to connect, collaborate, and build
                the future together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-nixerly-darkblue hover:bg-white/90 shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white bg-white/10 hover:bg-white/20 transition-all duration-300"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm mt-4">
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 transition-all">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Trusted by 500+ Companies
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 transition-all">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> 10,000+ Professionals
                </Badge>
              </div>
            </div>
            <div className="relative lg:block animate-fade-in">
              <div className="bg-white p-6 rounded-xl shadow-nixerly-card transform transition-transform duration-500 hover:translate-y-[-5px]">
                <Image
                  src="/collaborative-construction-planning.png"
                  alt="Construction professionals collaborating on a project"
                  width={600}
                  height={400}
                  className="mx-auto rounded-lg object-cover"
                  priority
                />
                <div className="absolute -bottom-4 -right-4 bg-nixerly-coral-gradient text-white p-3 rounded-lg shadow-lg text-sm font-semibold">
                  Join Today
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-nixerly-light-gradient py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center animate-slide-up">
            <div className="inline-flex px-3 py-1 rounded-full bg-nixerly-ultralightblue text-nixerly-darkblue text-sm font-medium mb-2">
              Platform Features
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-nixerly-darkblue">
                Why Choose Our Platform
              </h2>
              <p className="mx-auto max-w-[700px] text-nixerly-darkgray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We've built a comprehensive solution for the construction industry, connecting talent with opportunity.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-16">
            <Card className="border border-nixerly-lightblue/30 shadow-nixerly-card rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-2">
                <Building className="h-12 w-12 text-nixerly-blue mb-3 group-hover:text-nixerly-coral transition-colors duration-300" />
                <CardTitle className="text-nixerly-darkblue group-hover:text-nixerly-coral transition-colors duration-300">Business Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-nixerly-darkgray">
                  Create detailed company profiles to showcase your projects and attract top talent.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-nixerly-lightblue/30 shadow-nixerly-card rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-2">
                <HardHat className="h-12 w-12 text-nixerly-blue mb-3 group-hover:text-nixerly-coral transition-colors duration-300" />
                <CardTitle className="text-nixerly-darkblue group-hover:text-nixerly-coral transition-colors duration-300">Professional Portfolios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-nixerly-darkgray">
                  Build comprehensive portfolios highlighting your skills, experience, and certifications.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-nixerly-lightblue/30 shadow-nixerly-card rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-2">
                <Calendar className="h-12 w-12 text-nixerly-blue mb-3 group-hover:text-nixerly-coral transition-colors duration-300" />
                <CardTitle className="text-nixerly-darkblue group-hover:text-nixerly-coral transition-colors duration-300">Job Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-nixerly-darkgray">
                  Browse and apply to construction jobs or post opportunities for qualified professionals.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-nixerly-lightblue/30 shadow-nixerly-card rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-2">
                <Shield className="h-12 w-12 text-nixerly-blue mb-3 group-hover:text-nixerly-coral transition-colors duration-300" />
                <CardTitle className="text-nixerly-darkblue group-hover:text-nixerly-coral transition-colors duration-300">Verified Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-nixerly-darkgray">
                  Trust our verification system to ensure all credentials and qualifications are legitimate.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-nixerly-lightblue/30 shadow-nixerly-card rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-2">
                <Award className="h-12 w-12 text-nixerly-blue mb-3 group-hover:text-nixerly-coral transition-colors duration-300" />
                <CardTitle className="text-nixerly-darkblue group-hover:text-nixerly-coral transition-colors duration-300">Skill Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-nixerly-darkgray">
                  Our intelligent matching system connects businesses with professionals who have the right skills.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-nixerly-lightblue/30 shadow-nixerly-card rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="pb-2">
                <TrendingUp className="h-12 w-12 text-nixerly-blue mb-3 group-hover:text-nixerly-coral transition-colors duration-300" />
                <CardTitle className="text-nixerly-darkblue group-hover:text-nixerly-coral transition-colors duration-300">Industry Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-nixerly-darkgray">
                  Access valuable industry data, trends, and insights to stay ahead of the competition.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 md:py-28 relative">
        <div className="absolute top-0 inset-x-0 h-32 bg-nixerly-light-gradient transform -translate-y-1/2"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center justify-center space-y-4 text-center animate-slide-up">
            <div className="inline-flex px-3 py-1 rounded-full bg-nixerly-ultralightblue text-nixerly-darkblue text-sm font-medium mb-2">
              Getting Started
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-nixerly-darkblue">
                Simple Process, Powerful Results
              </h2>
              <p className="mx-auto max-w-[700px] text-nixerly-darkgray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform is designed to be intuitive and efficient for both professionals and businesses.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="professionals" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 bg-nixerly-ultralightblue rounded-xl mb-6 p-1">
                <TabsTrigger
                  value="professionals"
                  className="rounded-lg py-3 data-[state=active]:bg-nixerly-blue data-[state=active]:text-white transition-all duration-300"
                >
                  For Professionals
                </TabsTrigger>
                <TabsTrigger
                  value="businesses"
                  className="rounded-lg py-3 data-[state=active]:bg-nixerly-blue data-[state=active]:text-white transition-all duration-300"
                >
                  For Businesses
                </TabsTrigger>
              </TabsList>
              <TabsContent value="professionals" className="mt-6 space-y-8 animate-fade-in">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="rounded-full bg-nixerly-blue p-4 mb-2">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-darkblue">Create Your Profile</h3>
                    <p className="text-nixerly-darkgray">
                      Sign up and build your professional portfolio with your skills and experience.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="rounded-full bg-nixerly-blue p-4 mb-2">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-darkblue">Browse Opportunities</h3>
                    <p className="text-nixerly-darkgray">Explore job listings that match your skills and experience level.</p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="rounded-full bg-nixerly-blue p-4 mb-2">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-darkblue">Apply & Connect</h3>
                    <p className="text-nixerly-darkgray">Apply to jobs and connect directly with construction businesses.</p>
                  </div>
                </div>
                <div className="flex justify-center mt-10">
                  <Button className="bg-nixerly-blue hover:bg-nixerly-darkblue shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]" asChild>
                    <Link href="/register" className="flex items-center gap-2">
                      Sign Up as a Professional <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="businesses" className="mt-6 space-y-8 animate-fade-in">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="rounded-full bg-nixerly-coral p-4 mb-2">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-darkblue">Create Company Profile</h3>
                    <p className="text-nixerly-darkgray">
                      Set up your business profile and showcase your company and projects.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="rounded-full bg-nixerly-coral p-4 mb-2">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-darkblue">Post Job Listings</h3>
                    <p className="text-nixerly-darkgray">
                      Create detailed job listings with required skills and qualifications.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3 p-6 bg-white rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="rounded-full bg-nixerly-coral p-4 mb-2">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-darkblue">Review & Hire</h3>
                    <p className="text-nixerly-darkgray">
                      Review applications from qualified professionals and make hiring decisions.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mt-10">
                  <Button className="bg-nixerly-coral hover:bg-nixerly-darkcoral shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]" asChild>
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

      {/* Testimonials */}
      <section className="bg-nixerly-ultralightblue py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center animate-slide-up">
            <div className="inline-flex px-3 py-1 rounded-full bg-white text-nixerly-darkblue text-sm font-medium mb-2">
              Success Stories
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-nixerly-darkblue">
                What Our Users Say
              </h2>
              <p className="mx-auto max-w-[700px] text-nixerly-darkgray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from professionals and businesses who found success on our platform.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-nixerly-lightblue h-12 w-12 flex items-center justify-center">
                  <span className="text-nixerly-darkblue font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-bold text-nixerly-darkblue">John Donovan</h4>
                  <p className="text-sm text-nixerly-darkgray">Master Electrician</p>
                </div>
              </div>
              <p className="text-nixerly-darkgray italic">"Within a week of creating my profile, I was hired for a commercial project that lasted 6 months. The verification system gave my credentials credibility."</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-nixerly-lightcoral h-12 w-12 flex items-center justify-center">
                  <span className="text-white font-bold">SC</span>
                </div>
                <div>
                  <h4 className="font-bold text-nixerly-darkblue">Sarah Chen</h4>
                  <p className="text-sm text-nixerly-darkgray">Construction Manager</p>
                </div>
              </div>
              <p className="text-nixerly-darkgray italic">"The skill matching feature saved our HR team countless hours. We found qualified candidates quickly and completed our project ahead of schedule."</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-nixerly-card border border-nixerly-lightblue/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full bg-nixerly-blue h-12 w-12 flex items-center justify-center">
                  <span className="text-white font-bold">MB</span>
                </div>
                <div>
                  <h4 className="font-bold text-nixerly-darkblue">Michael Brown</h4>
                  <p className="text-sm text-nixerly-darkgray">General Contractor</p>
                </div>
              </div>
              <p className="text-nixerly-darkgray italic">"Our company's profile has attracted high-quality talent for our projects. The platform's verification system ensures we're getting qualified professionals every time."</p>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Construction Career?</h2>
              <p className="text-white/90">Join thousands of professionals and businesses on the Nixerly platform today.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-nixerly-darkblue hover:bg-white/90 shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]" asChild>
                <Link href="/register">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white bg-white/10 hover:bg-white/20 transition-all duration-300" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 