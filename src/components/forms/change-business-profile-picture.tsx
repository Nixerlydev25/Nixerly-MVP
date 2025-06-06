'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useModalStore } from '@/store/modal.store';
import { useBusinessProfilePicture } from '@/hook/business/business.hook';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'File size must be less than 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type),
      'Only .jpg, .png, .gif, and .webp formats are supported'
    ),
});

type FormData = z.infer<typeof formSchema>;

export function ChangeBusinessProfilePictureForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { closeModal } = useModalStore();
  const { uploadProfilePicture, isPending } = useBusinessProfilePicture();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    await uploadProfilePicture(data.file, closeModal);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('file', file, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative h-32 w-32 overflow-hidden rounded-full">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="text-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={isPending}
            >
              Choose Image
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
            />
            <p className="mt-2 text-sm text-muted-foreground">
              JPG, PNG, GIF or WEBP (max. 5MB)
            </p>
            {form.formState.errors.file && (
              <p className="mt-1 text-sm text-destructive">
                {form.formState.errors.file.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={closeModal}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending || !form.formState.isDirty}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
} 