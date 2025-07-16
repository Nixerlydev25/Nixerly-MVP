"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneInputComponent } from "@/components/common/phone-input";
import { useUpdateBusinessProfile } from "@/hook/user/user.hooks";

interface EditBusinessPhoneFormProps {
  initialPhoneNumber?: string;
  onSuccess: () => void;
}

export const EditBusinessPhoneForm = ({ initialPhoneNumber, onSuccess }: EditBusinessPhoneFormProps) => {
  const { mutateAsync: updateBusinessProfile, isPending } = useUpdateBusinessProfile(true);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || "");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }
    try {
      await updateBusinessProfile({
        phoneNumber,
      });
      onSuccess();
    } catch (error) {
      console.error("Error updating phone number:", error);
      setError("Failed to update phone number");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <PhoneInputComponent
          value={phoneNumber}
          onChange={(value) => {
            setPhoneNumber(value);
            setError("");
          }}
          error={error}
          required
          className="w-full"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-nixerly-blue text-white"
        >
          {isPending ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
}; 