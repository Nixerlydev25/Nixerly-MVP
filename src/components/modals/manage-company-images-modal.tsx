"use client";

import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useCompanyImages } from "@/hook/business/business.hook";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { ImagePlus, Loader2, Trash2, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { TBusinessAsset } from "@/types/auth";
import { Separator } from "../ui/separator";
export interface CompanyImagesModalData {
  assets: TBusinessAsset[];
}


export function ManageCompanyImagesModal() {
  const { activeModal, modalData, closeModal } = useModalStore();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedToDelete, setSelectedToDelete] = useState<string[]>([]);
  const { uploadCompanyImages, deleteAssets, isPending } = useCompanyImages();
  const assets = ((modalData as CompanyImagesModalData)?.assets || []) as TBusinessAsset[];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Validate file types
    const validFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/')
    );

    if (validFiles.length !== acceptedFiles.length) {
      toast.error("Some files were rejected. Only images are allowed.");
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const toggleDeleteImage = (assetId: string) => {
    setSelectedToDelete(prev => 
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleSave = async () => {
    try {
      if (selectedToDelete.length > 0) {
        await deleteAssets(selectedToDelete);
      }
      
      if (selectedFiles.length > 0) {
        await uploadCompanyImages(selectedFiles, () => {
          setSelectedFiles([]);
          setSelectedToDelete([]);
          closeModal();
        });
      } else {
        setSelectedToDelete([]);
        closeModal();
      }
    } catch (error) {
      console.error("Error managing company images:", error);
      toast.error("There was an error managing your company images");
    }
  };

  return (
    <Dialog open={activeModal === ModalType.MANAGE_COMPANY_IMAGES} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
      <DialogHeader className='px-6 pt-6 flex flex-row items-center gap-3 '>
        <div className="flex items-center justify-center h-10 w-10 md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">01</span>
          </div>
          <div className="w-4/5">
          <DialogTitle className="text-nixerly-blue">Manage Company Images</DialogTitle>
          <DialogDescription>Drag & drop images here, or click to select files
          Supported formats: JPEG, PNG, GIF, WebP (max 5MB)</DialogDescription>
          </div>
        </DialogHeader>
        <Separator/>
        <div className="space-y-6">
          <div className="px-6">
          {/* Upload Section */}
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors pb-4",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            )}
          >
            <input {...getInputProps()} />
            <Image src="/placeholderImg.png" alt="321pily" width={75} height={68} className="mx-auto"/>
            <p className="mt-2 text-sm text-muted-foreground">
            Drop your image here, or <span className="text-nixerly-blue text-sm font-medium">Browser</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
            Supports: PNG, JPG, JPEG, WEBP (max 5MB)
            </p>
          </div>

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Selected Files</h4>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group aspect-square">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Existing Images */}
          {assets.length > 0 ? (
            <div className="space-y-2 pt-3">
              <h4 className="font-medium text-nixerly-blue">Existing Images</h4>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {assets.map((asset) => (
                  <div key={asset.id} className="relative group aspect-square">
                    <img
                      src={asset.url}
                      alt="Company image"
                      className={cn(
                        "w-full h-full object-cover rounded-lg transition-opacity",
                        selectedToDelete.includes(asset.id) && "opacity-50"
                      )}
                    />
                    <button
                      onClick={() => toggleDeleteImage(asset.id)}
                      className={cn(
                        "absolute top-2 right-2 p-1.5 rounded-full transition-all",
                        selectedToDelete.includes(asset.id)
                          ? "bg-red-500 text-white opacity-100"
                          : "bg-black/50 text-white opacity-0 group-hover:opacity-100"
                      )}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No company images uploaded yet.</p>
          )}
          </div>
          <Separator className="p-0"/>

          <div className="flex justify-end gap-4 px-6 pb-6">
            <Button className="rounded-full" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button className="rounded-full bg-nixerly-blue" onClick={handleSave} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 