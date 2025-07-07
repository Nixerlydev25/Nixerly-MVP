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
import Link from "next/link";

export default function Component() {
  return (
    <div className="mb-6 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* Left Content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-primary font-medium text-sm uppercase tracking-wide">
                  Hiring Made Simple
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-primary/60 text-primary/60"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl lg:text-4xl font-bold text-foreground leading-tight font-title">
                Find the perfect talent for your{" "}
                <span className="text-primary">growing business</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Access a comprehensive hiring dashboard where you can manage
                applications, track candidates, schedule interviews, and make
                data-driven decisions.
              </p>
            </div>
          </div>

          {/* Right Links */}
          <div className="w-full lg:w-64 space-y-2">
            <Button className="w-full" asChild disabled>
              <Link href={ROUTES.POST_A_JOB}>
                <Pickaxe className="h-4 w-4 mr-2" />
                Post a New Job
              </Link>
            </Button>

            <Button variant="outline" className="w-full" asChild disabled>
              <Link href={ROUTES.MY_JOBS}>
                <FileText className="h-4 w-4 mr-2" />
                My Jobs
              </Link>
            </Button>

            {/* <Button variant="outline" className="w-full" asChild>
              <Link href="/business/candidates">
                <Users className="h-4 w-4 mr-2" />
                Manage Candidates
              </Link>
            </Button> */}

            <div className="grid grid-cols-3 gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex-col h-auto py-2"
                // asChild
                disabled={true}
              >
                {/* <Link href="/business/interviews"> */}
                  <Calendar className="h-4 w-4 mb-1" />
                  <span className="text-xs">Interviews</span>
                {/* </Link> */}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex-col h-auto py-2"
                // asChild
                disabled
              >
                {/* <Link href="/business/analytics"> */}
                  <BarChart3 className="h-4 w-4 mb-1" />
                  <span className="text-xs">Analytics</span>
                {/* </Link> */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
