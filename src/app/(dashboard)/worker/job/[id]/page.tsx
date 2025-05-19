import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Flag,
  HardHat,
  Heart,
  MapPin,
  // MessageSquare,
  Share2,
  Star,
  PenToolIcon as Tool,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function JobPostDetail() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Job Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-muted">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="Company logo"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    Experienced Plumber Needed for Residential Project
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span>Reliable Plumbing Co.</span>
                    </span>
                    <span className="hidden md:inline">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>San Diego, CA</span>
                    </span>
                    <span className="hidden md:inline">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Posted 2 days ago</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex gap-2">
                <Button size="icon" variant="outline">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Save job</span>
                </Button>
                <Button size="icon" variant="outline">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share job</span>
                </Button>
                <Button size="icon" variant="outline">
                  <Flag className="h-5 w-5" />
                  <span className="sr-only">Report job</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge className="flex items-center gap-1 text-sm">
                <HardHat className="h-3.5 w-3.5" />
                Plumbing
              </Badge>
              <Badge
                className="flex items-center gap-1 text-sm"
                variant="outline"
              >
                <Clock className="h-3.5 w-3.5" />
                Full-time
              </Badge>
              <Badge
                className="flex items-center gap-1 text-sm"
                variant="outline"
              >
                <Tool className="h-3.5 w-3.5" />
                5+ years experience
              </Badge>
              <Badge
                className="flex items-center gap-1 text-sm"
                variant="outline"
              >
                <Truck className="h-3.5 w-3.5" />
                Vehicle required
              </Badge>
            </div>
            <div className="flex md:hidden gap-2">
              <Button size="icon" variant="outline">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Save job</span>
              </Button>
              <Button size="icon" variant="outline">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share job</span>
              </Button>
              <Button size="icon" variant="outline">
                <Flag className="h-5 w-5" />
                <span className="sr-only">Report job</span>
              </Button>
            </div>
          </div>

          {/* Job Details Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="space-y-4 pt-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Job Description</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    We are seeking an experienced plumber to join our team for a
                    large residential project in San Diego. This project
                    involves installing new plumbing systems in a 20-unit
                    apartment complex, including water supply lines, drainage
                    systems, and fixture installation.
                  </p>
                  <p>
                    The ideal candidate will have extensive experience in
                    residential plumbing, be familiar with local building codes,
                    and be able to work efficiently while maintaining
                    high-quality standards.
                  </p>
                  <h3 className="text-base font-medium text-foreground mt-4 mb-2">
                    Responsibilities:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Install, repair, and maintain plumbing systems and
                      fixtures
                    </li>
                    <li>
                      Read and interpret blueprints and building specifications
                    </li>
                    <li>
                      Troubleshoot and resolve plumbing issues efficiently
                    </li>
                    <li>
                      Ensure all work complies with relevant codes and
                      regulations
                    </li>
                    <li>
                      Coordinate with other construction professionals on site
                    </li>
                    <li>Maintain a clean and safe work environment</li>
                  </ul>
                  <h3 className="text-base font-medium text-foreground mt-4 mb-2">
                    Benefits:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Competitive pay based on experience ($35-45/hour)</li>
                    <li>
                      Consistent work schedule with potential for overtime
                    </li>
                    <li>
                      Opportunity for long-term employment after project
                      completion
                    </li>
                    <li>Tools and equipment provided</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="requirements" className="space-y-4 pt-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Job Requirements</h2>
                <div className="space-y-3 text-muted-foreground">
                  <h3 className="text-base font-medium text-foreground mb-2">
                    Qualifications:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>5+ years of experience in residential plumbing</li>
                    <li>Valid plumbing license for the state of California</li>
                    <li>Knowledge of local building codes and regulations</li>
                    <li>
                      Ability to read and interpret blueprints and
                      specifications
                    </li>
                    <li>Experience with PEX, copper, and PVC piping systems</li>
                    <li>
                      Strong problem-solving skills and attention to detail
                    </li>
                  </ul>
                  <h3 className="text-base font-medium text-foreground mt-4 mb-2">
                    Physical Requirements:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Ability to lift and carry up to 50 pounds</li>
                    <li>Comfortable working in confined spaces</li>
                    <li>
                      Capable of standing, kneeling, and bending for extended
                      periods
                    </li>
                    <li>Good hand-eye coordination and manual dexterity</li>
                  </ul>
                  <h3 className="text-base font-medium text-foreground mt-4 mb-2">
                    Other Requirements:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Reliable transportation to job sites</li>
                    <li>Clean driving record</li>
                    <li>Must pass background check</li>
                    <li>Availability to work Monday-Friday, 7am-4pm</li>
                    <li>Occasional weekend work may be required</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="company" className="space-y-4 pt-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  About Reliable Plumbing Co.
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Reliable Plumbing Co. has been serving the San Diego area
                    for over 15 years. We specialize in residential and
                    commercial plumbing services, with a focus on new
                    construction and renovation projects.
                  </p>
                  <p>
                    Our team consists of licensed professionals who take pride
                    in their work and are committed to providing high-quality
                    service. We value reliability, integrity, and craftsmanship
                    in everything we do.
                  </p>
                  {/* <div className="flex items-center gap-2 mt-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <span className="font-medium text-foreground">4.8/5</span>
                    <span>(124 reviews)</span>
                  </div>
                  <div className="mt-4">
                    <Link href="#" className="text-primary hover:underline">
                      View company profile
                    </Link>
                  </div> */}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Similar Jobs */}
          {/* <div className="space-y-4">
            <h2 className="text-xl font-semibold">Similar Jobs</h2>
            <div className="grid gap-4">
              {[1, 2, 3].map((job) => (
                <Card key={job}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          alt="Company logo"
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium">
                          <Link href="#" className="hover:underline">
                            {job === 1
                              ? "Journeyman Plumber for Commercial Project"
                              : job === 2
                              ? "Apprentice Plumber - Training Provided"
                              : "Plumbing Maintenance Technician"}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5" />
                            <span>
                              {job === 1
                                ? "ABC Plumbing"
                                : job === 2
                                ? "City Plumbers Inc."
                                : "Maintenance Masters"}
                            </span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>
                              {job === 1
                                ? "Los Angeles, CA"
                                : job === 2
                                ? "San Diego, CA"
                                : "Oceanside, CA"}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <DollarSign className="h-3 w-3" />
                            {job === 1
                              ? "$40-50/hr"
                              : job === 2
                              ? "$20-25/hr"
                              : "$30-35/hr"}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Clock className="h-3 w-3" />
                            {job === 1
                              ? "Full-time"
                              : job === 2
                              ? "Full-time"
                              : "Part-time"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div> */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                {/* <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Job Details</h3>
                  <Badge variant="secondary">Verified</Badge>
                </div> */}
                {/* <Separator /> */}
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">$35-45 per hour</p>
                      <p className="text-sm text-muted-foreground">
                        Based on experience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Full-time</p>
                      <p className="text-sm text-muted-foreground">
                        40 hours per week
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Start date</p>
                      <p className="text-sm text-muted-foreground">Immediate</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Professionals</p>
                      <p className="text-sm text-muted-foreground">
                        10 Required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="w-full">Apply Now</Button>
              {/* <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Employer
              </Button> */}
            </CardContent>
          </Card>

          {/* Employer Card */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Company logo"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Reliable Plumbing Co.</h3>
                  <p className="text-sm text-muted-foreground">
                    Member since 2018
                  </p>
                </div>
              </div>
              {/* <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Response rate</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Average response time</span>
                  <span className="font-medium">2 hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Jobs posted</span>
                  <span className="font-medium">27</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Hire rate</span>
                  <span className="font-medium">87%</span>
                </div>
              </div> */}
              {/* <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm text-muted-foreground">
                  (124 reviews)
                </span>
              </div> */}
            </CardContent>
          </Card>

          {/* Job Location */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Job Location</h3>
              <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Map location"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Mission Valley area, San Diego, CA 92108
                <br />
                Exact address provided after application
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
