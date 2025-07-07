"use client";

import type React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useWorkerProfilePicture } from "@/hook/worker/worker.hook";
import { ImageCropper } from "@/components/common/ImageCropper";

interface ChangeWorkerProfilePictureFormProps {
  currentProfilePicture: string;
  onProfilePictureChange: (newImageUrl: string) => void;
  onClose: () => void;
}

export function ChangeWorkerProfilePictureForm({
  currentProfilePicture,
  onClose,
}: ChangeWorkerProfilePictureFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadProfilePicture, isPending } = useWorkerProfilePicture();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const validImageTypes = /^image\/(jpeg|png|gif|webp)$/;
    if (!validImageTypes.test(file.type)) {
      toast.error("Please select a JPEG, PNG, GIF, or WebP image");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please select an image smaller than 5MB");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsCropping(true);

    // Clean up the object URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      uploadProfilePicture(selectedFile, onClose);
    } catch (error) {
      // Error is already handled in the hook
      console.error("Error in handleUpload:", error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCropComplete = async (croppedImageBlob: Blob) => {
    const file = new File([croppedImageBlob], selectedFile?.name || 'cropped-image.jpg', {
      type: 'image/jpeg'
    });
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(croppedImageBlob);
    setPreviewUrl(objectUrl);
    setIsCropping(false);
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsCropping(false);
  };

  return (
    <>
      <DialogDescription>
        Upload a new profile picture. The image should be square and at least
        400x400 pixels.
      </DialogDescription>

      <div className="flex flex-col items-center justify-center gap-4 py-4">
        {isCropping && previewUrl ? (
          <ImageCropper
            imageUrl={previewUrl}
            onCropComplete={handleCropComplete}
            onCancel={() => {
              removeImage();
              setIsCropping(false);
            }}
            aspectRatio={1}
          />
        ) : (
          <>
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-gray-200">
              <Image
                src={previewUrl || currentProfilePicture || "/placeholder.svg"}
                alt="Profile preview"
                fill
                className="object-cover"
              />
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <Button onClick={triggerFileInput} variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Select Image
            </Button>
          </>
        )}
      </div>

      <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        {!isCropping && selectedFile && (
          <Button
            onClick={handleUpload}
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        )}
      </DialogFooter>
    </>
  );
}
