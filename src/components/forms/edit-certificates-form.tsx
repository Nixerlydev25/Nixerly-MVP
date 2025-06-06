"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Certificate, CertificateType } from "@/types/worker.types";
import { useCertificates } from "@/hook/worker/certificate.hook";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { DialogFooter } from "../ui/dialog";
import Image from "next/image";

const certificateSchema = z.object({
  name: z.string().min(1, "Certificate name is required"),
  issuingOrg: z.string().min(1, "Issuing organization is required"),
  issueDate: z.string(),
  expiryDate: z.string().optional().nullable(),
  credentialUrl: z.string().url().optional(),
  certificateType: z.nativeEnum(CertificateType),
});

const formSchema = z.object({
  certificates: z.array(certificateSchema),
});

type FormData = z.infer<typeof formSchema>;

interface EditCertificatesFormProps {
  onClose: () => void;
}

export function EditCertificatesForm({ onClose }: EditCertificatesFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File[] }>(
    {}
  );
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const { createCertificates, uploadCertificateAssets, isLoading } =
    useCertificates();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificates: [
        {
          name: "",
          issuingOrg: "",
          issueDate: new Date().toISOString().split("T")[0],
          expiryDate: null,
          credentialUrl: "",
          certificateType: CertificateType.OTHER,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certificates",
  });

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles((prev) => ({
        ...prev,
        [index]: Array.from(files),
      }));
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // First, create the certificates
      const createdCertificates = await createCertificates(data.certificates);

      // Then, upload any associated files
      await Promise.all(
        createdCertificates.map(
          async (certificate: Certificate, index: number) => {
            const files = selectedFiles[index];
            if (files && files.length > 0) {
              await uploadCertificateAssets({
                files,
                certificateId: certificate.id,
              });
            }
          }
        )
      );

      onClose();
    } catch (error) {
      console.error("Error submitting certificates:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Certificate {index + 1}</h3>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name={`certificates.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certificates.${index}.issuingOrg`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issuing Organization</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certificates.${index}.certificateType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select certificate type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(CertificateType).map(
                            ([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {key.replace(/_/g, " ")}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certificates.${index}.issueDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certificates.${index}.expiryDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`certificates.${index}.credentialUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credential URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-4">
                <FormLabel>Certificate Images</FormLabel>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileChange(index, e)}
                    ref={(el) => {
                      fileInputRefs.current[index] = el;
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRefs.current[index]?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Images
                  </Button>
                </div>
                {selectedFiles[index] && selectedFiles[index].length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {selectedFiles[index].map((file, fileIndex) => (
                      <div
                        key={fileIndex}
                        className="relative aspect-square overflow-hidden rounded-lg border"
                      >
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Certificate ${index + 1} image ${
                            fileIndex + 1
                          }`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              append({
                name: "",
                issuingOrg: "",
                issueDate: new Date().toISOString().split("T")[0],
                expiryDate: null,
                credentialUrl: "",
                certificateType: CertificateType.OTHER,
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Certificate
          </Button>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
