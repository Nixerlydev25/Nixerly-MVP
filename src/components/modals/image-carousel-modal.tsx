"use client";

import { Dialog, DialogContent } from "../ui/dialog";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { TBusinessAsset } from "@/types/auth";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageCarouselModalData {
  images: TBusinessAsset[];
  startIndex: number;
}

export function ImageCarouselModal() {
  const { activeModal, modalData, closeModal } = useModalStore();
  const typedModalData = (modalData as unknown) as ImageCarouselModalData;
  const [currentIndex, setCurrentIndex] = useState<number>(typedModalData?.startIndex || 0);
  const [api, setApi] = useState<CarouselApi>();
  const images = (typedModalData?.images || []) as TBusinessAsset[];

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Dialog open={activeModal === ModalType.IMAGE_CAROUSEL} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-4xl p-0 bg-black/90">
        <div className="relative h-[80vh] flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-50"
            onClick={closeModal}
          >
            <X className="h-6 w-6" />
          </Button>

          <Carousel
            opts={{
              align: "center",
              loop: true,
              startIndex: currentIndex,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.id} className="flex items-center justify-center">
                  <img
                    src={image.url}
                    alt="Company image"
                    className="max-h-[70vh] max-w-full object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-4 text-white hover:bg-white/20" />
                <CarouselNext className="right-4 text-white hover:bg-white/20" />
              </>
            )}
          </Carousel>

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Thumbnail navigation */}
          {images.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full p-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all",
                    currentIndex === index ? "border-white" : "border-transparent opacity-50 hover:opacity-75"
                  )}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 