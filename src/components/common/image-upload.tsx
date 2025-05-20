"use client"

import { useState, useCallback } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
    value: string   
    onChange: (url: string) => void
    label: string
}

export function ImageUpload({ value, onChange, label }:ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState(value)

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0]
        handleFile(file)
      }
    },
    [onChange],
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    // In a real app, you would upload the file to a server or cloud storage
    // For this example, we'll create a local object URL
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

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
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-32 w-32 mx-auto transition-colors ${
            isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <div className="flex items-center gap-2">
            <label htmlFor="image-upload" className="text-xs text-primary cursor-pointer hover:underline">
              Upload
            </label>
            <input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
        </div>
      )}
    </div>
  )
}
