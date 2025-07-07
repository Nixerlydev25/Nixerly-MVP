import { useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '@/components/ui/button';

interface ImageCropperProps {
  imageUrl: string;
  onCropComplete: (croppedImageBlob: Blob) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

export function ImageCropper({
  imageUrl,
  onCropComplete,
  onCancel,
  aspectRatio = 1
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImgRef(e.currentTarget);
  };

  const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleCropComplete = async () => {
    if (!imgRef) return;
    try {
      const croppedImageBlob = await getCroppedImg(imgRef, crop as PixelCrop);
      onCropComplete(croppedImageBlob);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        aspect={aspectRatio}
        circularCrop
      >
        <img
          src={imageUrl}
          onLoad={onImageLoad}
          alt="Crop me"
          className="max-h-[400px] w-auto"
        />
      </ReactCrop>
      <div className="flex gap-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleCropComplete} className="bg-blue-600 hover:bg-blue-700">
          Apply Crop
        </Button>
      </div>
    </div>
  );
} 