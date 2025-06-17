"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Copy, Facebook, Twitter, Linkedin, Mail, MessageCircle, Check } from "lucide-react"
import { useModalStore, ShareModalData } from "@/store/modal.store"
import { ModalType } from "@/types/model"

export function ShareModal() {
  const { activeModal, modalData, closeModal } = useModalStore()
  const isOpen = activeModal === ModalType.SHARE_MODAL
  const profileUrl = ((modalData as ShareModalData)?.profileUrl ?? '') as string
  const profileName = ((modalData as ShareModalData)?.profileName ?? '') as string
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
    },
    {
      name: "Twitter", 
      icon: Twitter,
      color: "text-sky-500",
      bgColor: "bg-sky-50 hover:bg-sky-100",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(`Check out ${profileName}'s profile`)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "text-blue-700",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "text-gray-600",
      bgColor: "bg-gray-50 hover:bg-gray-100",
      url: `mailto:?subject=${encodeURIComponent(`Check out ${profileName}'s profile`)}&body=${encodeURIComponent(`I thought you might be interested in this freelancer profile: ${profileUrl}`)}`,
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 hover:bg-green-100",
      url: `https://wa.me/?text=${encodeURIComponent(`Check out ${profileName}'s profile: ${profileUrl}`)}`,
    },
  ]

  const handleSocialShare = (url: string) => {
    window.open(url, "_blank", "width=600,height=400")
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Profile</DialogTitle>
          <DialogDescription>Share {profileName}&apos;s profile with others</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Copy Link Section */}
          <div className="space-y-2">
            <Label htmlFor="profile-url">Profile Link</Label>
            <div className="flex gap-2">
              <Input id="profile-url" value={profileUrl} readOnly className="flex-1" />
              <Button onClick={handleCopyLink} variant="outline" size="icon" className={copied ? "text-green-600" : ""}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {copied && <p className="text-sm text-green-600">Link copied to clipboard!</p>}
          </div>

          <Separator />

          {/* Social Share Options */}
          <div className="space-y-3">
            <Label>Share on social media</Label>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="outline"
                  className={`justify-start gap-3 h-12 ${option.bgColor} border-gray-200`}
                  onClick={() => handleSocialShare(option.url)}
                >
                  <option.icon className={`h-5 w-5 ${option.color}`} />
                  <span className="text-gray-700">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
