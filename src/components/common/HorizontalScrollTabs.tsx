"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SidebarItem<T extends React.Key = string> {
  id: T
  label: string
  icon: string
  description: string
}

interface HorizontalScrollTabsProps<T extends React.Key = string> {
  items: SidebarItem<T>[]
  activeTab: T
  onTabChange: (tab: T) => void
}

export function HorizontalScrollTabs<T extends React.Key = string>({
  items,
  activeTab,
  onTabChange,
}: HorizontalScrollTabsProps<T>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }
  return (
    <div className="lg:hidden bg-[#F5F7FA] py-10 px-4 rounded-2xl">
      <h2 className="text-xl lg:text-2xl font-medium text-gray-400 mb-6">Profile Details</h2>
      <div className="max-w-[350px] overflow-hidden">
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex gap-2 overflow-x-auto scrollbar-hide cursor-grab select-none transition-all duration-300 ease-in-out",
            isDragging && "cursor-grabbing",
          )}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {items.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  // Prevent click if we were dragging
                  if (isDragging) {
                    e.preventDefault()
                    return
                  }
                  onTabChange(item.id)
                }}
                className={cn(
                  "flex items-center p-2 rounded-2xl text-left transition-all duration-300 ease-in-out border flex-shrink-0 pointer-events-auto transform hover:scale-105 active:scale-95",
                  isActive
                    ? "bg-nixerly-blue gap-1 text-white border-nixerly-blue min-w-[160px] shadow-lg shadow-nixerly-blue/20"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-md items-center",
                )}
              >
                <span
                  className={cn(
                    "h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out flex-shrink-0",
                    isActive ? "text-nixerly-blue bg-white/20" : "bg-gray-100",
                  )}
                >
                  <Image
                    src={item.icon || "/placeholder.svg"}
                    alt={item.label}
                    width={18}
                    height={18}
                    className={cn(
                      "transition-all duration-300 ease-in-out",
                      isActive ? "filter invert brightness-0" : "opacity-100"
                    )}
                  />
                </span>
                {isActive && (
                  <div className="flex-1 min-w-0 animate-in slide-in-from-right-2 duration-300">
                    <p className="font-medium text-sm lg:text-sm leading-tight">{item.label}</p>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
} 