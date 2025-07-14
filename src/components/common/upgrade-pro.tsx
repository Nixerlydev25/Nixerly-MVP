"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function UpgradePro() {
  const handleUpgradeClick = () => {
    // Add your upgrade logic here
    console.log("Upgrade to Pro clicked")
  }

  return (
    <Card className="mx-4 mb-4 bg-blue-100 border-nixerly-blue">
      <CardContent className="px-3">
        <div className="space-y-3">
          <h3 className="text-nixerly-blue font-semibold text-base">Upgrade to Pro</h3>
          <p className="text-nixerly-businesslabel text-[13px] leading-relaxed">Get Access to Premium Templates And Resources</p>
          <Button
            onClick={handleUpgradeClick}
            className="w-full bg-nixerly-blue  text-white text-sm font-medium py-2 rounded-full"
            size="sm"
          >
            Upgrade Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
