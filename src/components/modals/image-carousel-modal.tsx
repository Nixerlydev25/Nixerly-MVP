"use client"

import { Dialog, DialogContent } from "../ui/dialog"
import { useModalStore } from "@/store/modal.store"
import { ModalType } from "@/types/model"
import type { TBusinessAsset } from "@/types/auth"
import { Button } from "../ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface ImageCarouselModalData {
  images: TBusinessAsset[]
  startIndex: number
}

export function ImageCarouselModal() {
  const { activeModal, modalData, closeModal } = useModalStore()
  const typedModalData = modalData as unknown as ImageCarouselModalData
  const [currentIndex, setCurrentIndex] = useState<number>(typedModalData?.startIndex || 0)
  const images = (typedModalData?.images || []) as TBusinessAsset[]

  useEffect(() => {
    if (typedModalData?.startIndex !== undefined) {
      setCurrentIndex(typedModalData.startIndex)
    }
  }, [typedModalData?.startIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModal !== ModalType.IMAGE_CAROUSEL) return

      switch (e.key) {
        case "ArrowRight":
          goToNext()
          break
        case "ArrowLeft":
          goToPrev()
          break
        case "Escape":
          closeModal()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeModal, closeModal])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Calculate positions for stacking effect
  const getSlideStyle = (index: number) => {
    const diff = index - currentIndex
    const absIndex = Math.abs(diff)

    if (absIndex === 0) {
      // Current slide - center, full scale
      return {
        transform: "translateX(0%) scale(1)",
        opacity: 1,
        zIndex: 10,
      }
    } else if (absIndex === 1) {
      // Adjacent slides - visible but scaled down
      const translateX = diff > 0 ? "60%" : "-60%"
      return {
        transform: `translateX(${translateX}) scale(0.8)`,
        opacity: 0.7,
        zIndex: 5,
      }
    } else if (absIndex === 2) {
      // Second adjacent slides - more scaled down
      const translateX = diff > 0 ? "80%" : "-80%"
      return {
        transform: `translateX(${translateX}) scale(0.6)`,
        opacity: 0.4,
        zIndex: 3,
      }
    } else {
      // Hidden slides
      const translateX = diff > 0 ? "100%" : "-100%"
      return {
        transform: `translateX(${translateX}) scale(0.5)`,
        opacity: 0,
        zIndex: 1,
      }
    }
  }

  return (
    <Dialog open={activeModal === ModalType.IMAGE_CAROUSEL} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-6xl shadow-none p-0 bg-transparent border-0 ">
        <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Close button */}


          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-50"
            onClick={closeModal}
          >
            <X className="h-6 w-6" />
          </Button> */}

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 w-12 h-12"
                onClick={goToPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 w-12 h-12"
                onClick={goToNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Main carousel container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {images.map((image, index) => {
              const style = getSlideStyle(index)
              return (
                <div
                  key={image.id}
                  className="absolute flex items-center justify-center transition-all duration-500 ease-out cursor-pointer"
                  style={style}
                  onClick={() => {
                    if (index !== currentIndex) {
                      goToSlide(index)
                    }
                  }}
                >
                  <div className="relative w-[800px] h-[600px] rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={`Company image ${index + 1}`}
                      className="w-full h-full object-cover"
                      style={{
                        filter: index === currentIndex ? "none" : "brightness(0.8)",
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
