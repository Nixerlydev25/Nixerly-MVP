import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { Separator } from "../ui/separator";

const aboutFormSchema = z.object({
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
    .max(2000, { message: "Description cannot exceed 2000 characters" }),
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
        <div className="grid gap-4 py-4 px-6 relative">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Description</FormLabel>
                <FormControl className="text-nixerly-businesslabel">
                  <div className="relative">
                    <Textarea
                      {...field}
                      placeholder="Describe your business, services, and expertise..."
                      className="max-h-[200px] text-nixerly-businesslabel resize-none"
                    />
                    <span className="absolute bottom-2 right-4 text-xs bg-white text-[#99A0AE] font-normal px-1 rounded pointer-events-none">
                      {field.value.length}/2000 {""} Max
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator/>
        <DialogFooter className="pt-6">
          <Button className="rounded-full" type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="bg-nixerly-blue rounded-full" type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
