"use client";

import type React from "react";
import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Loader2, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { useBusinessProfilePicture } from "@/hook/business/business.hook";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { ImageCropper } from "@/components/common/ImageCropper";

interface ChangeBusinessProfilePictureFormProps {
  currentProfilePicture: string;
  onClose: () => void;
}

export function ChangeBusinessProfilePictureForm({
  currentProfilePicture,
  onClose,
}: ChangeBusinessProfilePictureFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const { uploadProfilePicture, isPending } = useBusinessProfilePicture();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Validate file types
    const validFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/')
    );

    if (validFiles.length !== acceptedFiles.length) {
      toast.error("Some files were rejected. Only images are allowed.");
      return;
    }

    const file = validFiles[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Please select an image smaller than 5MB");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsCropping(true);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      uploadProfilePicture(selectedFile, onClose);
    } catch (error) {
      console.error("Error in handleUpload:", error);
    }
  };

  const removeImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsCropping(false);
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
        ) : previewUrl ? (
          <div className="relative h-40 w-40">
            <Image
              src={previewUrl}
              alt="Profile preview"
              fill
              className="rounded-full object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              "flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed transition-colors",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            )}
          >
            <input {...getInputProps()} />
            <ImagePlus className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-center text-xs text-muted-foreground">
              Drag & drop or click
            </p>
            <p className="text-center text-xs text-muted-foreground">
              Max 5MB
            </p>
          </div>
        )}
      </div>

      <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
        <Button variant="outline" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        {!isCropping && (
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isPending}
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