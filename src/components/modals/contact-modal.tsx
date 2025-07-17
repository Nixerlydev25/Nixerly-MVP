import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Phone, Mail, Copy, Check } from "lucide-react";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { toast } from "sonner";

interface ContactModalData {
  applicant: {
    workerProfile: {
      user: {
        firstName: string;
        lastName: string;
        email: string;
      };
      profilePicture?: string;
      phoneNumber: string;
    };
    relevantExperience: string;
  };
}

export default function ContactModal() {
  const { activeModal, closeModal, modalData } = useModalStore();

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactData =
    activeModal === ModalType.CONTACT_MODAL
      ? (modalData as ContactModalData)
      : null;

  const handleCopy = (text: string, type: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    if (type === "phone") {
      setCopiedPhone(true);
      toast.success("Phone number copied to clipboard");
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      toast.success("Email address copied to clipboard");
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <Dialog
      open={activeModal === ModalType.CONTACT_MODAL}
      onOpenChange={closeModal}
    >
      <DialogContent className="max-w-sm  sm:max-w-lg  ">
    <div className="flex items-center border-b">
          <div className="flex-shrink-0 pl-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300">
              <span className="p-2 text-lg font-semibold text-black">01</span>
            </div>
          </div>
          <div>
            <DialogHeader className="">
              <DialogTitle>Contact Information</DialogTitle>
              <DialogDescription>
                Contact details for {contactData?.applicant?.workerProfile?.user?.firstName}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>



        <div className="p-4 space-y-3">
          <div className="flex gap-4">
            <div>

              <Avatar className="h-16 w-16">
              <AvatarImage
                src={
                  contactData?.applicant?.workerProfile?.profilePicture || ""
                }
                alt={
                  contactData?.applicant?.workerProfile?.user?.firstName +
                  " " +
                  contactData?.applicant?.workerProfile?.user?.lastName
                }
              />
              <AvatarFallback>
                {contactData?.applicant?.workerProfile?.user?.firstName.charAt(
                  0
                )}
              </AvatarFallback>
            </Avatar>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">
                {contactData?.applicant?.workerProfile?.user?.firstName +
                  " " +
                  contactData?.applicant?.workerProfile?.user?.lastName}
              </h3>
             <p className="text-sm text-muted-foreground">
                {contactData?.applicant?.relevantExperience?.replace(/_/g, ' ')}{' '}
                Experience
              </p>
             
            </div>
          </div>

          <Separator />

          <div className="space-y-3 p-4">
            <div className="flex  gap-3">
              <Phone className="h-5 w-5 mt-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Phone</p>
                <div className="flex items-center gap-2">
                  <p>{contactData?.applicant?.workerProfile?.phoneNumber}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 ml-2"
                    onClick={() =>
                      handleCopy(
                        contactData?.applicant?.workerProfile?.phoneNumber ||
                          "",
                        "phone"
                      )
                    }
                  >
                    {copiedPhone ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex gap-2 mt-1">
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`tel:${contactData?.applicant?.workerProfile?.phoneNumber}`}
                    >
                      Call
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`https://wa.me/${contactData?.applicant?.workerProfile?.phoneNumber?.replace(
                        /[^0-9]/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex  gap-3">
              <Mail className="h-5 w-5 mt-2 text-muted-foreground" />
              <div>
                <p className="font-medium">Email</p>
                <div className="flex items-center gap-2">
                  <p>{contactData?.applicant?.workerProfile?.user?.email}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 ml-2"
                    onClick={() =>
                      handleCopy(
                        contactData?.applicant?.workerProfile?.user?.email ||
                          "",
                        "email"
                      )
                    }
                  >
                    {copiedEmail ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="mt-1">
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={`mailto:${contactData?.applicant?.workerProfile?.user?.email}`}
                    >
                      Send Email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
