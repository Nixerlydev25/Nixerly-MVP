import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
import {
  Briefcase,
  Users,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  Star,
  User,
  Pickaxe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Component() {
  return (
    <div className="container mx-auto  ">


      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center max-w-8xl mb-6">


        <div>

          <h1 className="text-black text-xl font-semibold leading-8 font-inter">Find Talent</h1>
          <p className="text-nixerly-businesslabel text-base font-normal leading-4 tracking-wide font-inter my-1">Welcome back, Test Technologies!</p>
        </div>

        {/* Right Links */}

        <div className="  flex flex-col sm:flex-row gap-2 sm:gap-4  sm:w-auto ">
          <Button className="bg-nixerly-blue rounded-full text-white text-sm font-medium leading-5 tracking-tight font-inter custom-font-features  " asChild disabled>
            <Link href={ROUTES.POST_A_JOB}>
              {/* <Pickaxe className="h-4 w-4 mr-2" /> */}
              <Image src="/emailwriting.svg" alt="post a job" width={16} height={16}></Image>
              Post a New Job
            </Link>
          </Button>

          <Button  className="bg-nixerly-blue rounded-full text-white text-sm font-medium leading-5 tracking-tight font-inter custom-font-features " asChild disabled>
            <Link href={ROUTES.MY_JOBS}>
              {/* <FileText className="h-4 w-4 mr-2" /> */}
                   <Image src="/emailwriting.svg" alt="post a job" width={16} height={16}></Image>
              My Jobs
            </Link>
          </Button>

          {/* <Button variant="outline" className="w-full" asChild>
              <Link href="/business/candidates">
                <Users className="h-4 w-4 mr-2" />
                Manage Candidates
              </Link>
            </Button> */}

          {/* <div className="grid grid-cols-3 gap-2 pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2"
              asChild
              disabled={true}
            >
              <Link href="/business/interviews">
              <Calendar className="h-4 w-4 mb-1" />
              <span className="text-xs">Interviews</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2"
              asChild
              disabled
            >
              <Link href="/business/analytics">
              <BarChart3 className="h-4 w-4 mb-1" />
              <span className="text-xs">Analytics</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex-col h-auto py-2"
              asChild
            >
              <Link href={ROUTES.MY_BUSINESS_PROFILE}>
                <User className="h-4 w-4 mb-1" />
                <span className="text-xs">Profile</span>
              </Link>
            </Button>
          </div> */}
        </div>


      </div>

{/* banner  find talent*/}
         <div className="relative mb-6 bg-black rounded-2xl shadow-sm overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute inset-0 pointer-events-none ml-12">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -ml-24">
          <Image src="/circleborder.svg" alt="" width={252} height={344} className="opacity-70" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3">
          <Image src="/circlewhite.svg" alt="" width={317} height={317} className="opacity-100" />
        </div>
      </div>

      <div className="relative z-10 p-6">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Left Content */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-white text-sm font-medium leading-5 tracking-tight">Hiring Made Simple</span>
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-white text-2xl sm:text-3xl font-medium leading-tight">
                  Find the perfect talent for your{" "}
                </h2>
                <h2 className="text-blue-400 text-2xl sm:text-3xl font-medium leading-tight mb-3">growing business</h2>
              </div>
              <p className="text-white leading-normal max-w-2xl text-sm">
                Access a comprehensive hiring dashboard where you can manage applications, track candidates, schedule
                interviews, and make data-driven decisions.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="relative w-full lg:w-80 h-28 lg:h-45">
              <Image
                src="/blog3.png"
                alt="Hiring dashboard illustration"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
