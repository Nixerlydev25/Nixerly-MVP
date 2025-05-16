"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PencilIcon, PlusCircle, Trash2, StarIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const experienceSchema = z.object({
  title: z.string().min(2, {
    message: "Project title must be at least 2 characters.",
  }),
  client: z.string().min(2, {
    message: "Client name must be at least 2 characters.",
  }),
  completedDate: z.string().min(2, {
    message: "Completion date is required.",
  }),
  hours: z.string().regex(/^\d+$/, {
    message: "Hours must be a number.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

type ExperienceFormValues = z.infer<typeof experienceSchema>

interface Experience {
  id: string
  title: string
  client: string
  completedDate: string
  rating: number
  hours: number
  description: string
}

interface ExperienceModalProps {
  isOpen: boolean
  onClose: () => void
  experienceList: Experience[]
}

export function ExperienceModal({ isOpen, onClose, experienceList }: ExperienceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: "",
      client: "",
      completedDate: "",
      hours: "",
      description: "",
    },
  })

  const resetForm = () => {
    form.reset({
      title: "",
      client: "",
      completedDate: "",
      hours: "",
      description: "",
    })
    setCurrentExperience(null)
    setIsEditing(false)
  }

  const handleEdit = (experience: Experience) => {
    setCurrentExperience(experience)
    form.reset({
      title: experience.title,
      client: experience.client,
      completedDate: experience.completedDate,
      hours: experience.hours.toString(),
      description: experience.description,
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    try {
    //   await deleteExperience(id)
    //   toast({
    //     title: "Experience deleted",
    //     description: "Work experience has been removed successfully.",
    //   })
      resetForm()
    } catch (error) {
        cosole.log(error)
    //   toast({
    //     title: "Error",
    //     description: "Failed to delete work experience.",
    //     variant: "destructive",
    //   })
    }
  }

  const onSubmit = async (values: ExperienceFormValues) => {
    setIsSubmitting(true)
    try {
      if (currentExperience) {
        // await updateExperience(currentExperience.id, values)
        // toast({
        //   title: "Experience updated",
        //   description: "Your work experience has been updated successfully.",
        // })
      } else {
        // await addExperience(values)
        // toast({
        //   title: "Experience added",
        //   description: "Your work experience has been added successfully.",
        // })
      }
      resetForm()
    } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Something went wrong. Please try again.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Work Experience</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* List of work experiences */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Your Work History</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  resetForm()
                  setIsEditing(true)
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>

            {experienceList.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No work experience entries yet. Add your first one!</div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {experienceList.map((experience) => (
                  <Card key={experience.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{experience.title}</h4>
                          <p className="text-gray-600">{experience.client}</p>
                          <div className="flex items-center mt-1">
                            <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="text-sm">{experience.rating.toFixed(1)}</span>
                            <span className="text-sm text-gray-500 ml-2">{experience.completedDate}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{experience.hours} hours worked</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(experience)}>
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(experience.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mt-2 line-clamp-2">{experience.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Form for adding/editing experience */}
          {isEditing && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-medium mb-4">
                  {currentExperience ? "Edit Work Experience" : "Add Work Experience"}
                </h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                              <Input placeholder="E-commerce Platform Redesign" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="client"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client</FormLabel>
                            <FormControl>
                              <Input placeholder="Company Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="completedDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Completion Date</FormLabel>
                            <FormControl>
                              <Input placeholder="March 2023" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hours Worked</FormLabel>
                            <FormControl>
                              <Input placeholder="120" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the project, your role, and the technologies used."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Provide details about the project and your contributions.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : currentExperience ? "Update" : "Add"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
