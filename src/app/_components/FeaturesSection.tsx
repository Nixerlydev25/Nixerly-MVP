import Image  from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Building, HardHat, Calendar, Shield, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FeaturesSection() {
  return (
    <section className="py-20 md:pt-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="animate-slide-up flex flex-col items-center justify-center space-y-4 text-center">
          <div className="mb-2 px-3 py-1 text-xl font-bold text-primary">
            Platform Features
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-normal tracking-tighter text-black sm:text-4xl md:text-5xl">
              Why <span className="text-primary font-semibold">Choose</span> Our Platform
            </h2>
            <p className="mx-auto max-w-[700px] text-nixerly-darkgray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We&apos;ve built a comprehensive solution for the construction industry, connecting talent with
              opportunity.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="mb-4 relative flex h-16 w-16 items-center justify-center">
                <Image src="/profiles.svg" alt="profile" width={54} height={54}/>
              </div>
              <CardTitle className="text-xl font-semibold text-nixerly-darkgray">Business Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nixerly-darkgray leading-relaxed">
                Create detailed company profiles to showcase your projects and attract top talent.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="mb-4 relative flex h-16 w-16 items-center justify-center">
                <Image src="/portfolio.svg" alt="protfolio" width={54} height={54}/>
              </div>
              <CardTitle className="text-xl font-semibold text-nixerly-darkgray">Professional Portfolios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nixerly-darkgray leading-relaxed">
                Build comprehensive portfolios highlighting your skills, experience, and certifications.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="mb-4 relative flex h-16 w-16 items-center justify-center">
                <Image src="/marketing.svg" alt="Marketing" width={54} height={54}/>
              </div>
              <CardTitle className="text-xl font-semibold text-nixerly-darkgray">Job Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nixerly-darkgray leading-relaxed">
                Browse and apply to construction jobs or post opportunities for qualified professionals.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="mb-4 relative flex h-16 w-16 items-center justify-center">
          <Image src="/verify.svg" alt="verify" width={54} height={54}/>
              </div>
              <CardTitle className="text-xl font-semibold text-nixerly-darkgray">Verified Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nixerly-darkgray leading-relaxed">
                Trust our verification system to ensure all credentials and qualifications are legitimate.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="mb-4 relative flex h-16 w-16 items-center justify-center">
              <Image src="/skillmatch.svg" alt="verify" width={54} height={54}/>
              </div>
              <CardTitle className="text-xl font-semibold text-nixerly-darkgray">Skill Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nixerly-darkgray leading-relaxed">
                Our intelligent matching system connects businesses with professionals who have the right skills.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="mb-4 relative flex h-16 w-16 items-center justify-center">
              <Image src="/industry.svg" alt="verify" width={54} height={54}/>
              </div>
              <CardTitle className="text-xl font-semibold text-nixerly-darkgray">Industry Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nixerly-darkgray leading-relaxed">
                Access valuable industry data, trends, and insights to stay ahead of the competition.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="w-full mx-auto flex justify-center py-12">
        <Button asChild className="text-white rounded-full p-4 mx-auto justify-center items-center">
          <Link href="/about">Learn More</Link>
        </Button>
        </div>
      </div>
    </section>
  )
}
