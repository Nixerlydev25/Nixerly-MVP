import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building, HardHat, Calendar, Shield, Award, TrendingUp } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-nixerly-gradient py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-5">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Connecting Construction Talent with Opportunity
              </h1>
              <p className="max-w-[600px] text-white/90 md:text-xl">
                The premier platform for construction professionals and businesses to connect, collaborate, and build
                the future together.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-white text-nixerly-blue hover:bg-white/90" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white bg-white/10 hover:bg-white/20"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  Trusted by 500+ Companies
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  10,000+ Professionals
                </Badge>
              </div>
            </div>
            <div className="relative lg:block">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <Image
                  src="/collaborative-construction-planning.png"
                  alt="Construction professionals collaborating on a project"
                  width={600}
                  height={400}
                  className="mx-auto rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-nixerly-blue">
                Why Choose Our Platform
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We've built a comprehensive solution for the construction industry, connecting talent with opportunity.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card className="border border-nixerly-lightblue/30">
              <CardHeader className="pb-2">
                <Building className="h-12 w-12 text-nixerly-blue mb-2" />
                <CardTitle className="text-nixerly-blue">Business Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Create detailed company profiles to showcase your projects and attract top talent.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-nixerly-lightblue/30">
              <CardHeader className="pb-2">
                <HardHat className="h-12 w-12 text-nixerly-blue mb-2" />
                <CardTitle className="text-nixerly-blue">Professional Portfolios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Build comprehensive portfolios highlighting your skills, experience, and certifications.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-nixerly-lightblue/30">
              <CardHeader className="pb-2">
                <Calendar className="h-12 w-12 text-nixerly-blue mb-2" />
                <CardTitle className="text-nixerly-blue">Job Marketplace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Browse and apply to construction jobs or post opportunities for qualified professionals.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-nixerly-lightblue/30">
              <CardHeader className="pb-2">
                <Shield className="h-12 w-12 text-nixerly-blue mb-2" />
                <CardTitle className="text-nixerly-blue">Verified Credentials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Trust our verification system to ensure all credentials and qualifications are legitimate.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-nixerly-lightblue/30">
              <CardHeader className="pb-2">
                <Award className="h-12 w-12 text-nixerly-blue mb-2" />
                <CardTitle className="text-nixerly-blue">Skill Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Our intelligent matching system connects businesses with professionals who have the right skills.
                </p>
              </CardContent>
            </Card>
            <Card className="border border-nixerly-lightblue/30">
              <CardHeader className="pb-2">
                <TrendingUp className="h-12 w-12 text-nixerly-blue mb-2" />
                <CardTitle className="text-nixerly-blue">Industry Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Access valuable industry data, trends, and insights to stay ahead of the competition.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-nixerly-lightblue/20 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-nixerly-blue">
                Simple Process, Powerful Results
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform is designed to be intuitive and efficient for both professionals and businesses.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="professionals" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 bg-nixerly-lightblue/30">
                <TabsTrigger
                  value="professionals"
                  className="data-[state=active]:bg-nixerly-blue data-[state=active]:text-white"
                >
                  For Professionals
                </TabsTrigger>
                <TabsTrigger
                  value="businesses"
                  className="data-[state=active]:bg-nixerly-blue data-[state=active]:text-white"
                >
                  For Businesses
                </TabsTrigger>
              </TabsList>
              <TabsContent value="professionals" className="mt-6 space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center space-y-2 p-4 bg-white rounded-lg shadow-sm">
                    <div className="rounded-full bg-nixerly-blue/10 p-3 mb-2">
                      <span className="text-2xl font-bold text-nixerly-blue">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-blue">Create Your Profile</h3>
                    <p className="text-gray-500">
                      Sign up and build your professional portfolio with your skills and experience.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2 p-4 bg-white rounded-lg shadow-sm">
                    <div className="rounded-full bg-nixerly-blue/10 p-3 mb-2">
                      <span className="text-2xl font-bold text-nixerly-blue">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-blue">Browse Opportunities</h3>
                    <p className="text-gray-500">Explore job listings that match your skills and experience level.</p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2 p-4 bg-white rounded-lg shadow-sm">
                    <div className="rounded-full bg-nixerly-blue/10 p-3 mb-2">
                      <span className="text-2xl font-bold text-nixerly-blue">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-blue">Apply & Connect</h3>
                    <p className="text-gray-500">Apply to jobs and connect directly with construction businesses.</p>
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <Button className="bg-nixerly-blue hover:bg-nixerly-blue/90" asChild>
                    <Link href="/register">
                      Sign Up as a Professional <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="businesses" className="mt-6 space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center space-y-2 p-4 bg-white rounded-lg shadow-sm">
                    <div className="rounded-full bg-nixerly-blue/10 p-3 mb-2">
                      <span className="text-2xl font-bold text-nixerly-blue">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-blue">Create Company Profile</h3>
                    <p className="text-gray-500">
                      Set up your business profile and showcase your company and projects.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2 p-4 bg-white rounded-lg shadow-sm">
                    <div className="rounded-full bg-nixerly-blue/10 p-3 mb-2">
                      <span className="text-2xl font-bold text-nixerly-blue">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-blue">Post Job Listings</h3>
                    <p className="text-gray-500">
                      Create detailed job listings with required skills and qualifications.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2 p-4 bg-white rounded-lg shadow-sm">
                    <div className="rounded-full bg-nixerly-blue/10 p-3 mb-2">
                      <span className="text-2xl font-bold text-nixerly-blue">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-blue">Review & Hire</h3>
                    <p className="text-gray-500">
                      Review applications from qualified professionals and make hiring decisions.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <Button className="bg-nixerly-blue hover:bg-nixerly-blue/90" asChild>
                    <Link href="/register">
                      Sign Up as a Business <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-nixerly-blue">
                What Our Users Say
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from professionals and businesses who have found success on our platform.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <Card className="border border-nixerly-lightblue/30">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src="/diverse-professionals-meeting.png"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Michael Rodriguez</p>
                    <p className="text-sm text-gray-500">Master Electrician</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 italic">
                    "This platform has transformed my career. I've found consistent work with reputable companies and
                    built a strong professional network."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-nixerly-lightblue/30">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src="/diverse-business-owner.png"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Construction Manager, BuildRight Inc.</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 italic">
                    "We've reduced our hiring time by 60% and found highly qualified professionals for our projects. The
                    verification system gives us confidence in every hire."
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-nixerly-lightblue/30">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src="/construction-site-overview.png"
                      alt="Profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">David Chen</p>
                    <p className="text-sm text-gray-500">Independent Contractor</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 italic">
                    "As an independent contractor, this platform has been invaluable. The job matching algorithm
                    consistently connects me with projects that fit my expertise."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-nixerly-blue py-16 md:py-24 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <h3 className="text-4xl font-bold">10,000+</h3>
              <p className="text-xl">Registered Professionals</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <h3 className="text-4xl font-bold">500+</h3>
              <p className="text-xl">Construction Companies</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <h3 className="text-4xl font-bold">2,500+</h3>
              <p className="text-xl">Jobs Filled</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <h3 className="text-4xl font-bold">95%</h3>
              <p className="text-xl">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-nixerly-gradient py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Transform Your Construction Career?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of professionals and businesses already building the future together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6">
              <Button size="lg" className="bg-white text-nixerly-blue hover:bg-white/90" asChild>
                <Link href="/register">Get Started Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white bg-white/10 hover:bg-white/20"
                asChild
              >
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