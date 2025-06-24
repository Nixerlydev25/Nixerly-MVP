import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { usePortfolios } from "@/hook/worker/portfolio.hook";
import { Portfolio } from "@/types/worker.types";
import { useState } from "react";
import { PortfolioImageUpload } from "../common/portfolio-image-upload";
import { Trash2, X, Plus, Globe, LinkIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

const portfolioSchema = z.object({
  portfolios: z.array(
    z.object({
      title: z.string().min(1, "Portfolio title is required"),
      description: z.string().min(1, "Description is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional().nullable(),
      employerName: z.string().min(1, "Employer name is required"),
      employerWebsite: z.string().url().optional().or(z.literal("")),
      projectUrl: z.string().url().optional().or(z.literal("")),
    })
  ),
});

type PortfolioFormValues = z.infer<typeof portfolioSchema>;

interface EditPortfolioFormProps {
  onSuccess: () => void;
  portfolio?: Portfolio[];
}

export function EditPortfolioForm({
  onSuccess,
  portfolio = [],
}: EditPortfolioFormProps) {
  const { createPortfolios, deletePortfolios, isLoading } = usePortfolios();
  const [selectedFiles, setSelectedFiles] = useState<{ [key: number]: File[] }>(
    {}
  );
  const [portfoliosToDelete, setPortfoliosToDelete] = useState<string[]>([]);

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      portfolios: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "portfolios",
    control: form.control,
  });

  const onSubmit = async (values: PortfolioFormValues) => {
    try {
      // Delete marked portfolios first
      if (portfoliosToDelete.length > 0) {
        await deletePortfolios(portfoliosToDelete);
      }

      // Only create new portfolios if there are any in the form
      if (values.portfolios.length > 0) {
        await createPortfolios(values.portfolios, selectedFiles);
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting portfolio form:", error);
    }
  };

  const handleFileSelect = (files: File[], index: number) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [index]: files,
    }));
  };

  const handleDeleteExistingPortfolio = (portfolioId: string) => {
    setPortfoliosToDelete((prev) => [...prev, portfolioId]);
  };

  // Filter out portfolios that are marked for deletion
  const displayedPortfolios = portfolio.filter(
    (item) => !portfoliosToDelete.includes(item.id)
  );

  const handleAddProject = () => {
    append({
      title: "",
      description: "",
      startDate: "",
      endDate: null,
      employerName: "",
      employerWebsite: "",
      projectUrl: "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Existing Portfolios Section */}
        {displayedPortfolios.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Existing Portfolio Projects</h3>
            <div className="space-y-4">
              {displayedPortfolios.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-lg border p-4 hover:bg-gray-50"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => handleDeleteExistingPortfolio(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-500">
                        {item.employerName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.startDate).toLocaleDateString()} -{" "}
                        {item.endDate
                          ? new Date(item.endDate).toLocaleDateString()
                          : "Present"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700">{item.description}</p>
                    <div className="flex flex-wrap gap-4">
                      {item.employerWebsite && (
                        <a
                          href={item.employerWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Globe className="h-4 w-4" />
                          Client Website
                        </a>
                      )}
                      {item.projectUrl && (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <LinkIcon className="h-4 w-4" />
                          Project Link
                        </a>
                      )}
                    </div>
                    {item.assets?.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {item.assets.map((asset, index) => (
                          <div
                            key={asset.id}
                            className="relative aspect-video overflow-hidden rounded-lg border"
                          >
                            <img
                              src={asset.url}
                              alt={`Project image ${index + 1}`}
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
          </div>
        )}

        {/* New Portfolio Projects Section */}
        {fields.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Add New Projects</h3>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg p-4 space-y-4 relative"
              >
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}

                <FormField
                  control={form.control}
                  name={`portfolios.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`portfolios.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`portfolios.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`portfolios.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
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

                <FormField
                  control={form.control}
                  name={`portfolios.${index}.employerName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client/Employer Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter client or employer name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`portfolios.${index}.employerWebsite`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client/Employer Website (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          type="url"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`portfolios.${index}.projectUrl`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          type="url"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Project Images (Optional)</FormLabel>
                  <PortfolioImageUpload
                    onFilesSelected={(files) => handleFileSelect(files, index)}
                    existingImages={[]}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleAddProject}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>

        <div className="sticky bottom-0 flex justify-end gap-4 pt-4 mt-6 border-t bg-white">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
