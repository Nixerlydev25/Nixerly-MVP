import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, HardHat, Calendar, Shield, Award, TrendingUp } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="bg-nixerly-light-gradient py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="animate-slide-up flex flex-col items-center justify-center space-y-4 text-center">
          <div className="mb-2 inline-flex rounded-full bg-nixerly-ultralightblue px-3 py-1 text-sm font-medium text-nixerly-darkblue">
            Platform Features
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter text-nixerly-darkblue sm:text-4xl md:text-5xl">
              Why Choose Our Platform
            </h2>
            <p className="mx-auto max-w-[700px] text-nixerly-darkgray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We&apos;ve built a comprehensive solution for the construction industry, connecting talent with opportunity.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group rounded-xl border border-nixerly-lightblue/30 bg-white shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-2">
              <Building className="mb-3 h-12 w-12 text-nixerly-blue transition-colors duration-300 group-hover:text-nixerly-coral" />
              <CardTitle className="text-nixerly-darkblue transition-colors duration-300 group-hover:text-nixerly-coral">Business Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nixerly-darkgray">
                Create detailed company profiles to showcase your projects and attract top talent.
              </p>
            </CardContent>
          </Card>
          <Card className="group rounded-xl border border-nixerly-lightblue/30 bg-white shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-2">
              <HardHat className="mb-3 h-12 w-12 text-nixerly-blue transition-colors duration-300 group-hover:text-nixerly-coral" />
              <CardTitle className="text-nixerly-darkblue transition-colors duration-300 group-hover:text-nixerly-coral">Professional Portfolios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nixerly-darkgray">
                Build comprehensive portfolios highlighting your skills, experience, and certifications.
              </p>
            </CardContent>
          </Card>
          <Card className="group rounded-xl border border-nixerly-lightblue/30 bg-white shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-2">
              <Calendar className="mb-3 h-12 w-12 text-nixerly-blue transition-colors duration-300 group-hover:text-nixerly-coral" />
              <CardTitle className="text-nixerly-darkblue transition-colors duration-300 group-hover:text-nixerly-coral">Job Marketplace</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nixerly-darkgray">
                Browse and apply to construction jobs or post opportunities for qualified professionals.
              </p>
            </CardContent>
          </Card>
          <Card className="group rounded-xl border border-nixerly-lightblue/30 bg-white shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-2">
              <Shield className="mb-3 h-12 w-12 text-nixerly-blue transition-colors duration-300 group-hover:text-nixerly-coral" />
              <CardTitle className="text-nixerly-darkblue transition-colors duration-300 group-hover:text-nixerly-coral">Verified Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nixerly-darkgray">
                Trust our verification system to ensure all credentials and qualifications are legitimate.
              </p>
            </CardContent>
          </Card>
          <Card className="group rounded-xl border border-nixerly-lightblue/30 bg-white shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-2">
              <Award className="mb-3 h-12 w-12 text-nixerly-blue transition-colors duration-300 group-hover:text-nixerly-coral" />
              <CardTitle className="text-nixerly-darkblue transition-colors duration-300 group-hover:text-nixerly-coral">Skill Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-nixerly-darkgray">
                Our intelligent matching system connects businesses with professionals who have the right skills.
              </p>
            </CardContent>
          </Card>
          <Card className="group rounded-xl border border-nixerly-lightblue/30 bg-white shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="pb-2">
              <TrendingUp className="mb-3 h-12 w-12 text-nixerly-blue transition-colors duration-300 group-hover:text-nixerly-coral" />
              <CardTitle className="text-nixerly-darkblue transition-colors duration-300 group-hover:text-nixerly-coral">Industry Insights</CardTitle>
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
  )
} 