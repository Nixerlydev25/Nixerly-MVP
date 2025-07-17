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
import { CertificateType, Certificate } from "@/types/worker.types";
import { useCertificates } from "@/hook/worker/certificate.hook";
import { Loader2, Plus, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Separator } from "../ui/separator";

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
  existingCertificates: Certificate[];
}

export function EditCertificatesForm({ onClose, existingCertificates }: EditCertificatesFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File[] }>(
    {}
  );
  const [certificatesToDelete, setCertificatesToDelete] = useState<string[]>([]);
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const { createCertificates, deleteCertificates, isLoading } = useCertificates();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      certificates: [],
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

  const handleDeleteExistingCertificate = (certificateId: string) => {
    setCertificatesToDelete(prev => [...prev, certificateId]);
  };

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Starting certificate creation with data:', data.certificates);
      
      // Delete marked certificates first
      if (certificatesToDelete.length > 0) {
        await deleteCertificates(certificatesToDelete);
      }

      // Create new certificates and handle asset uploads
      await createCertificates(data.certificates, selectedFiles);
      onClose();
    } catch (error) {
      console.error("Error submitting certificates:", error);
      throw error;
    }
  };

  // Filter out certificates that are marked for deletion
  const displayedCertificates = existingCertificates.filter(
    cert => !certificatesToDelete.includes(cert.id)
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-[calc(100vh-200px)]">
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-6">
            {displayedCertificates.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-nixerly-businesslabel">Existing Certificates</h3>
                <div className="gap-4">
      {displayedCertificates.map((certificate) => (
        <div key={certificate.id} className="relative p-4 hover:bg-gray-50 border rounded-lg mb-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => handleDeleteExistingCertificate(certificate.id)}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex items-start gap-4 pr-8">
            {/* Image/Logo Section - Now on the left */}
            <div className="flex-shrink-0">
              {certificate.assets?.length > 0 && (
                <div className="w-16 h-16 relative overflow-hidden rounded-lg border bg-gray-50 flex items-center justify-center">
                  <img
                    src={certificate.assets[0].url || "/placeholder.svg"}
                    alt={`${certificate.name} certificate`}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>

            {/* Text Content Section - Now on the right */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-lg">{certificate.name}</h4>
                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <Image src="/link.svg" alt="link" width={16} height={16} />
                  </a>
                )}
                  <div className="flex items-center gap-2">
                <Badge variant="outline">{certificate.certificateType}</Badge>
              </div>
              </div>

              <p className="text-sm text-gray-600">{certificate.issuingOrg}</p>


              <p className="text-sm text-gray-500">
                Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                {certificate.expiryDate && ` • Expires: ${new Date(certificate.expiryDate).toLocaleDateString()}`}
              </p>

              <p className="text-sm text-gray-600">has successfully completed</p>
            </div>
          </div>
        </div>
      ))}
    </div>
              </div>
            )}

            {fields.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Add New Certificates</h3>
                {fields.map((field, index) => (
                  <div key={field.id} className="">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="text-lg font-medium">Certificate {index + 1}</h4>
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
                              <Input placeholder="Sandford Univsersity" {...field} />
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
                              <Input placeholder="Computer Science" {...field} />
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
                              <FormControl>
                                <SelectTrigger className="p-0 px-5 w-full">
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
                        name={`certificates.${index}.credentialUrl`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Credential URL (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://"
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

                    </div>

                    <div className="mt-4">
                      {/* <FormLabel>Certificate Images</FormLabel> */}
                      <div className="">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden w-full"
                          onChange={(e) => handleFileChange(index, e)}
                          ref={(el) => {
                            fileInputRefs.current[index] = el;
                          }}
                        />
                        <Button
                          type="button"
                          className="w-full"
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
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Certificate ${index + 1} image ${fileIndex + 1}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

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
              Add Certificate
            </Button>
          </div>
        </div>
        <Separator/>
        <div className="flex justify-end gap-2 p-4  mt-auto">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-nixerly-blue rounded-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
