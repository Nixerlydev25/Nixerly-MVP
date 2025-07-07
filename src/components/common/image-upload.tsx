"use client"

import { useState, useCallback } from "react"
import { Upload, X, ImagePlus } from "lucide-react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ImageUploadProps {
    value: string   
    onChange: (url: string) => void
    label: string
}

export function ImageUpload({ value, onChange, label }:ImageUploadProps) {
  const [preview, setPreview] = useState(value)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Validate file types
    const validFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/')
    );

    if (validFiles.length !== acceptedFiles.length) {
      toast.error("Some files were rejected. Only images are allowed.");
      return;
    }

    if (validFiles[0]) {
      handleFile(validFiles[0])
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1
  });

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const target = e.target as FileReader | null
      if (!target) return
      const imageUrl = target.result as string
      setPreview(imageUrl)
      onChange(imageUrl)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setPreview("")
    onChange("")
  }

  return (
    <div className="space-y-2 w-full">
      <p className="text-sm font-medium">{label}</p>
      {preview ? (
        <div className="relative w-32 h-32 mx-auto">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover rounded-lg" />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-32 w-32 mx-auto transition-colors",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          )}
        >
          <input {...getInputProps()} />
          <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-xs text-muted-foreground text-center">
            Drag & drop or click to upload
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Max 5MB
          </p>
        </div>
      )}
    </div>
  )
}
