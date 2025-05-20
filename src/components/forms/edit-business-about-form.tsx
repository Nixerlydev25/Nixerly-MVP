import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";

const aboutFormSchema = z.object({
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
});

export interface EditBusinessAboutFormProps {
  onSubmit: (data: { description: string }) => void;
  defaultValues: { description: string };
  onCancel?: () => void;
}

export function EditBusinessAboutForm({ onSubmit, defaultValues, onCancel }: EditBusinessAboutFormProps) {
  const form = useForm({
    resolver: zodResolver(aboutFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe your business, services, and expertise..."
                    className="min-h-[200px]"
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormMessage />
                  <p className="text-xs text-muted-foreground">{field.value.length}/500 characters</p>
                </div>
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
