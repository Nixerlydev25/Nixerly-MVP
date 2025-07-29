import { useState, useCallback } from "react";
import { Upload, X, ImagePlus } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface PortfolioImageUploadProps {
  onFilesSelected: (files: File[]) => void;
  existingMedia?: string[]; // Renamed from existingImages
  disabled?: boolean;
  progress?: { [fileName: string]: number };
}

export function PortfolioImageUpload({
  onFilesSelected,
  existingMedia = [], // Renamed from existingImages
  disabled = false,
  progress = {},
}: PortfolioImageUploadProps) {
  // Store both preview URL and type
  const [previewFiles, setPreviewFiles] = useState<{ url: string, type: string }[]>(
    existingMedia.map((url) => ({ url, type: url.match(/\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i) ? 'video' : 'image' }))
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Validate file types (image or video) and size <= 50MB
      const validFiles = acceptedFiles.filter((file) => {
        const isValidType = file.type.startsWith("image/") || file.type.startsWith("video/");
        const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB
        if (!isValidSize) {
          toast.error(`File ${file.name} is too large. Max size is 50MB.`);
        }
        return isValidType && isValidSize;
      });

      if (validFiles.length === 0) {
        toast.error("Please upload only image or video files (max 50MB each)");
        return;
      }

      // Create preview objects for the new files
      const newPreviewFiles = validFiles.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type,
      }));
      setPreviewFiles((prev) => [...prev, ...newPreviewFiles]);

      // Call onFilesSelected with the new files
      onFilesSelected(validFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "video/*": [".mp4", ".webm", ".ogg", ".mov", ".avi"],
    },
    disabled,
  });

  const handleRemove = () => {
    // Revoke object URLs to prevent memory leaks
    previewFiles.forEach((file) => {
      if (file.url.startsWith("blob:")) {
        URL.revokeObjectURL(file.url);
      }
    });
    setPreviewFiles([]);
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
          <p className="text-xs text-gray-500">PNG, JPG, GIF, MP4, MOV, AVI up to 50MB</p>
        </div>
      </div>

      {previewFiles.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previewFiles.map((file, index) => {
              // Try to get the file name from the URL (for blob: URLs, this may not be possible)
              const fileName = file.url.split('/').pop() || `file${index}`;
              const percent = progress[fileName];
              return (
                <div
                  key={file.url}
                  className="relative aspect-video rounded-lg overflow-hidden border flex flex-col"
                >
                  {file.type.startsWith('video') ? (
                    <video
                      src={file.url}
                      controls
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <img
                      src={file.url}
                      alt={`Preview ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  )}
                  {percent !== undefined && (
                    <div className="w-full h-2 bg-gray-200 mt-2 rounded">
                      <div
                        className="h-2 bg-blue-500 rounded"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
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
            Remove all media
          </Button>
        </div>
      )}
    </div>
  );
} 