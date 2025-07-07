import { useState, useCallback } from "react";
import { Upload, X, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface PortfolioImageUploadProps {
  onFilesSelected: (files: File[]) => void;
  existingImages?: string[];
  disabled?: boolean;
}

export function PortfolioImageUpload({
  onFilesSelected,
  existingImages = [],
  disabled = false,
}: PortfolioImageUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>(existingImages);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Validate file types
      const validFiles = acceptedFiles.filter((file) =>
        file.type.startsWith("image/")
      );

      if (validFiles.length === 0) {
        toast.error("Please upload only image files");
        return;
      }

      // Create preview URLs for the new files
      const newPreviewUrls = validFiles.map((file) =>
        URL.createObjectURL(file)
      );

      // Update preview URLs
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

      // Call onFilesSelected with the new files
      onFilesSelected(validFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    disabled,
  });

  const handleRemove = () => {
    // Revoke object URLs to prevent memory leaks
    previewUrls.forEach((url) => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });
    setPreviewUrls([]);
    onFilesSelected([]);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-200 hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-primary">Click to upload</span> or
            drag and drop
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      {previewUrls.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewUrls.map((url, index) => (
              <div
                key={url}
                className="relative aspect-video rounded-lg overflow-hidden border"
              >
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleRemove}
            disabled={disabled}
          >
            <X className="h-4 w-4 mr-2" />
            Remove all images
          </Button>
        </div>
      )}
    </div>
  );
} 