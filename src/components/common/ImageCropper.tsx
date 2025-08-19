import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ZoomIn, ZoomOut } from 'lucide-react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';

interface ImageCropperProps {
  imageUrl: string;
  onComplete: (croppedImageBlob: Blob) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

export function ImageCropper({
  imageUrl,
  onComplete,
  onCancel,
  aspectRatio = 1
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = (location: { x: number; y: number }) => {
    setCrop(location);
  };

  const onZoomChange = (value: number) => {
    setZoom(value);
  };

  const handleCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (): Promise<Blob> => {
    if (!croppedAreaPixels) throw new Error('No crop area');

    const image = await createImage(imageUrl);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    // Set canvas size to match the cropped size
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    // Create circular clip (if you want to keep the circular crop)
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width, canvas.height) / 2,
      0,
      2 * Math.PI
    );
    ctx.clip();

    // Draw the cropped image
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(blob);
        },
        'image/jpeg',
        0.95
      );
    });
  };

  const handleSave = async () => {
    try {
      const croppedImageBlob = await getCroppedImg();
      onComplete(croppedImageBlob);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={handleCropComplete}
          cropShape="round"
          showGrid={false}
          objectFit="contain"
        />
      </div>

      <div className="w-full max-w-[400px] flex items-center gap-4 px-4">
        <ZoomOut className="w-4 h-4 text-muted-foreground" />
        <Slider
          value={[zoom]}
          min={1}
          max={3}
          step={0.1}
          onValueChange={([value]) => onZoomChange(value)}
          className="flex-1"
        />
        <ZoomIn className="w-4 h-4 text-muted-foreground" />
      </div>

      <div className="flex gap-4 justify-end w-full max-w-[400px]">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-nixerly-blue">
          Save
        </Button>
      </div>
    </div>
  );
} 