"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Building,
  Menu,
  Home,
  User,
  Briefcase,
  Users,
  FileText,
  Settings,
  LogOut,
  Shield,
  Bell,
  Search,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "professional" | "business" | "admin"
}

export default function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/")
  }

  // Navigation links based on user type
  const getNavLinks = () => {
    switch (userType) {
      case "professional":
        return [
          { href: "/dashboard/professional", label: "Dashboard", icon: Home },
          { href: "/dashboard/professional/profile", label: "Profile", icon: User },
          { href: "/dashboard/professional/jobs", label: "Find Jobs", icon: Briefcase },
          { href: "/dashboard/professional/applications", label: "Applications", icon: FileText },
          { href: "/dashboard/professional/settings", label: "Settings", icon: Settings },
        ]
      case "business":
        return [
          { href: "/dashboard/business", label: "Dashboard", icon: Home },
          { href: "/dashboard/business/professionals", label: "Find Professionals", icon: Users },
          { href: "/dashboard/business/jobs", label: "Job Postings", icon: Briefcase },
          { href: "/dashboard/business/company", label: "Company Profile", icon: Building },
          { href: "/dashboard/business/settings", label: "Settings", icon: Settings },
        ]
      case "admin":
        return [
          { href: "/dashboard/admin", label: "Dashboard", icon: Home },
          { href: "/dashboard/admin/users", label: "Users", icon: Users },
          { href: "/dashboard/admin/verifications", label: "Verifications", icon: Shield },
          { href: "/dashboard/admin/blog", label: "Blog", icon: FileText },
          { href: "/dashboard/admin/reports", label: "Reports", icon: FileText },
          { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
        ]
      default:
        return []
    }
  }

  const navLinks = getNavLinks()

  // User info based on user type
  const getUserInfo = () => {
    switch (userType) {
      case "professional":
        return {
          name: "John Doe",
          role: "Project Manager",
          avatar: "/mystical-forest-spirit.png",
        }
      case "business":
        return {
          name: "Acme Construction Ltd",
          role: "Business Account",
          avatar: "/abstract-geometric-logo.png",
        }
      case "admin":
        return {
          name: "Admin User",
          role: "Administrator",
          avatar: "/stylized-admin-icon.png",
        }
      default:
        return {
          name: "User",
          role: "Unknown",
          avatar: "/mystical-forest-spirit.png",
        }
    }
  }

  const userInfo = getUserInfo()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden bg-blue-500/20 border-white/20 hover:bg-blue-500/30 hover:text-white">
                  <Menu className="h-5 w-5 text-white" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r-blue-200">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 text-lg font-medium ${
                        isActive(link.href) ? "text-blue-600" : "text-blue-800 hover:text-blue-600"
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 mt-4">
                    <Button variant="outline" className="justify-start border-blue-300 text-blue-800 hover:bg-blue-50 hover:text-blue-600" asChild>
                      <Link href="/" onClick={() => setIsSidebarOpen(false)}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center ml-4">
              <span className="font-bold text-xl hidden sm:inline-block">Nixerly</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors">
                <Search className="h-5 w-5 text-white" />
                <span className="sr-only">Search</span>
              </div>
            </div>
            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors">
              <Bell className="h-5 w-5 text-white" />
              <span className="sr-only">Notifications</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                  <img
                    src={userInfo.avatar || "/placeholder.svg"}
                    alt="Avatar"
                    className="rounded-full"
                    width="32"
                    height="32"
                  />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-blue-200">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-blue-800">{userInfo.name}</span>
                    <span className="text-xs text-blue-600">{userInfo.role}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-blue-100" />
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/${userType}`} className="text-blue-700 hover:text-blue-600 cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/${userType}/settings`} className="text-blue-700 hover:text-blue-600 cursor-pointer">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-blue-100" />
                <DropdownMenuItem asChild>
                  <Link href="/" className="text-blue-700 hover:text-blue-600 cursor-pointer">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden md:flex w-64 flex-col border-r border-blue-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-blue-100 text-blue-700"
                    : "text-blue-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <link.icon className={`h-4 w-4 ${isActive(link.href) ? "text-blue-600" : "text-blue-500"}`} />
                {link.label}
              </Link>
            ))}
          </div>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
