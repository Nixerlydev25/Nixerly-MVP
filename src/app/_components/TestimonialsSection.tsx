"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Kamille H.",
    date: "August 2024",
    image: "/girl1.png",
    rating: 5,
    text: "Within a week of creating my profile, I was hired for a commercial project that lasted 6 months. The verification system gave my credentials credibility.",
    platform: "Pnode",
  },
  {
    id: 2,
    name: "Jane Cooper",
    date: "August 2024",
    image: "/girl2.png",
    rating: 5,
    text: "The skill matching feature saved our HR team countless hours. We found qualified candidates quickly and completed our project ahead of schedule.",
    platform: "Pnode",
  },
  {
    id: 3,
    name: "Kamille H.",
    date: "August 2024",
    image: "/girl3.png",
    rating: 5,
    text: "Our company's profile has attracted high-quality talent for our projects. The platform's verification system ensures we're getting qualified professionals every time.",
    platform: "Pnode",
  },
  {
    id: 4,
    name: "Michael Brown",
    date: "August 2024",
    image: "/girl4.png",
    rating: 5,
    text: "The platform has revolutionized how we find and hire skilled professionals. The quality of candidates is consistently high.",
    platform: "Pnode",
  },
  {
    id: 5,
    name: "Sarah Chen",
    date: "August 2024",
    image: "/girl1.png",
    rating: 5,
    text: "I've been able to showcase my skills effectively and connect with clients who value quality work. Highly recommended!",
    platform: "Pnode",
  },
  {
    id: 6,
    name: "David Wilson",
    date: "August 2024",
    image: "/girl2.png",
    rating: 5,
    text: "The networking opportunities and project matches have been incredible. This platform truly understands the needs of skilled professionals.",
    platform: "Pnode",
  },
]

export default function TestimonialsSection() {
  const cardsToShow = 3.5 // Show 3 full cards + half of the 4th card
  const visibleCards = Math.floor(cardsToShow)

  // Clone first and last visibleCards for seamless looping
  const extendedTestimonials = [
    ...testimonials.slice(-visibleCards),
    ...testimonials,
    ...testimonials.slice(0, visibleCards),
  ]

  const [currentIndex, setCurrentIndex] = useState(visibleCards)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const transitionRef = useRef(null)

  const slideCount = testimonials.length
  const totalSlides = extendedTestimonials.length
  const cardWidth = 391
  const cardGap = 24

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }

  // Handle seamless looping
  useEffect(() => {
    if (!isTransitioning) return
    const handle = setTimeout(() => {
      setIsTransitioning(false)
      // Jump to real slides if at clone
      if (currentIndex === totalSlides - visibleCards) {
        setCurrentIndex(visibleCards)
      } else if (currentIndex === 0) {
        setCurrentIndex(slideCount)
      }
    }, 300)
    return () => clearTimeout(handle)
  }, [currentIndex, isTransitioning, slideCount, totalSlides, visibleCards])

  return (
    <section className="bg-blue-50 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-600">What Our customer Say!</h2>
            <p className="text-gray-600 text-lg">
              Hear from professionals and businesses who found success on our platform.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <Button
              // variant="outline"
              size="icon"
              className="h-14 w-14 rounded-full border-gray-300 bg-white hover:bg-gray-50"
              onClick={prevSlide}
              disabled={isTransitioning}
            >
              <Image  src="/arrowLeft.svg" alt="arrowleft" width={30} height={30}/>
            </Button>
            <Button
              size="icon"
              className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700"
              onClick={nextSlide}
              disabled={isTransitioning}
            >
              <Image src="/arrowRight.svg" alt="arrowright" width={30} height={30} />
            </Button>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (cardWidth + cardGap)}px)`,
                transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
              }}
            >
              {extendedTestimonials.map((testimonial, idx) => (
                <div
                  key={idx + '-' + testimonial.id}
                  className="flex-shrink-0 bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  style={{
                    width: "391px",
                    height: "284px",
                  }}
                >
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.date}</p>
                    </div>
                    {/* Star Rating */}
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 leading-relaxed text-base mb-0 line-clamp-4 min-h-[96px]">"{testimonial.text}"</p>

                  {/* Posted on Platform */}
                  <div className="flex items-center gap-2 mt-6">
                    <span className="text-gray-600 text-sm font-medium">Posted on {testimonial.platform}</span>
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
