"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ImageUpload } from "../common/image-upload"
import { useModalStore } from "@/store/modal.store"
import { ModalType } from "@/types/model"

export function ImageUploadModal() {
  const { activeModal, closeModal, modalData } = useModalStore()
  const isOpen = activeModal === ModalType.EDIT_PROFILE_IMAGE

  const [imageUrl, setImageUrl] = useState(modalData?.currentImage || "")

  const handleImageUpload = (url: unknown) => {
    setImageUrl(url)
  }

  const handleSave = () => {

    // You can handle save logic here, e.g., call an API or update store
    // Example: onSave(imageUrl)
    closeModal()
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Company Logo</DialogTitle>
          <DialogDescription>
            Upload a logo for your business. This will be displayed on your profile and in search results.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-6">
          <ImageUpload value={imageUrl} onChange={handleImageUpload} label="Company Logo" />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Logo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
