"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: "/profiles.svg",
    title: "Business Profiles",
    description: "Create detailed company profiles to showcase your projects and attract top talent.",
  },
  {
    icon: "/portfolio.svg",
    title: "Professional Portfolios",
    description: "Build comprehensive portfolios highlighting your skills, experience, and certifications.",
  },
  {
    icon: "/marketing.svg",
    title: "Job Marketplace",
    description: "Browse and apply to construction jobs or post opportunities for qualified professionals.",
  },
  {
    icon: "/verify.svg",
    title: "Verified Credentials",
    description: "Trust our verification system to ensure all credentials and qualifications are legitimate.",
  },
  {
    icon: "/skillmatch.svg",
    title: "Skill Matching",
    description: "Our intelligent matching system connects businesses with professionals who have the right skills.",
  },
  {
    icon: "/industry.svg",
    title: "Industry Insights",
    description: "Access valuable industry data, trends, and insights to stay ahead of the competition.",
  },
]

export default function FeaturesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [screenSize, setScreenSize] = useState("mobile")
  const carouselRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const isDragging = useRef(false)

  useEffect(() => {
    setIsClient(true)

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setScreenSize("tablet")
      } else {
        setScreenSize("mobile")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const getCardsToShow = () => {
    return screenSize === "tablet" ? 2 : 1
  }

  const getMaxSlides = () => {
    const cardsToShow = getCardsToShow()
    return Math.max(0, features.length - cardsToShow)
  }

  const nextSlide = () => {
    const maxSlides = getMaxSlides()
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlides))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  const goToSlide = (index: number) => {
    const maxSlides = getMaxSlides()
    setCurrentSlide(Math.min(index, maxSlides))
  }

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    isDragging.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return

    const endX = e.changedTouches[0].clientX
    const diffX = startX.current - endX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }

    isDragging.current = false
  }

  // Mouse handlers for desktop swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX
    isDragging.current = true
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return

    const endX = e.clientX
    const diffX = startX.current - endX
    const threshold = 50

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }

    isDragging.current = false
  }

  const getTransformValue = () => {
    if (screenSize === "tablet") {
      // For tablet: show 2 cards, move by 2 cards width
      return `translateX(-${currentSlide * 50}%)`
    } else {
      // For mobile: show 1 card + 10% of next, move by ~90% to show next card with preview
      return `translateX(-${currentSlide * 90}%)`
    }
  }

  const getCardWidth = () => {
    if (screenSize === "tablet") {
      return "w-1/2" // 50% width for 2 cards
    } else {
      return "w-[90%]" // 90% width for 1 card + 10% preview
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <section className="py-10 lg:py-20 md:pt-28 bg-nixerly-blue">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="animate-slide-up flex flex-col items-center justify-center space-y-4 sm:text-start lg:text-center">
          <div className="space-y-3 text-white">
            <h2 className="text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl">
              Why <span className="font-semibold">Choose</span> Our Platform
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We&apos;ve built a comprehensive solution for the construction industry, connecting talent with
              opportunity.
            </p>
          </div>
        </div>

        {/* Desktop Grid Layout (lg and above) */}
        <div className="hidden lg:grid mx-auto mt-16 max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <CardHeader>
                <div className="mb-4 relative flex h-16 w-16 items-center justify-center">
                  <Image src={feature.icon || "/placeholder.svg"} alt={feature.title} width={54} height={54} />
                </div>
                <CardTitle className="text-xl font-semibold text-nixerly-darkgray px-6">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-nixerly-darkgray leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile/Tablet Carousel (below lg) */}
        <div className="lg:hidden mt-8">
          <div
            className="relative overflow-hidden cursor-grab active:cursor-grabbing"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => {
              isDragging.current = false
            }}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: getTransformValue() }}
            >
              {features.map((feature, index) => (
                <div key={index} className={`${getCardWidth()} flex-shrink-0 px-2`}>
                  <Card className="rounded-xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl h-full">
                    <CardHeader>
                      <div className="mb-4 relative flex h-16 w-16 items-center justify-center">
                        <Image src={feature.icon || "/placeholder.svg"} alt={feature.title} width={54} height={54} />
                      </div>
                      <CardTitle className="text-xl font-semibold text-nixerly-darkgray px-4">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-nixerly-darkgray leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: getMaxSlides() + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  currentSlide === index ? "bg-white" : "bg-transparent border-2 border-white hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="w-full mx-auto hidden lg:flex justify-center py-12 ">
          <Button asChild className="text-nixerly-blue rounded-full p-4 mx-auto justify-center items-center bg-white">
            <Link href="/about" className="hover:text-white">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
