"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { geolocationService } from "@/services/geolocation.service"

export interface LocationDetails {
  city: string
  state: string
  country: string
  formattedAddress: string
}

interface LocationSearchProps {
  onLocationSelect: (location: LocationDetails) => void
  defaultValue?: string
  className?: string
}

export function LocationSearch({ onLocationSelect, defaultValue = "", className }: LocationSearchProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationSuggestions, setLocationSuggestions] = useState<Array<{ placeId: string; description: string }>>([])
  const [justSelected, setJustSelected] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchLocations = async () => {
      if (value.length > 2 && !justSelected) {
        try {
          const suggestions = await geolocationService.getLocationSuggestions(value)
          setLocationSuggestions(suggestions)
          if (suggestions.length > 0 && !open) {
            setOpen(true)
          }
        } catch (error) {
          console.error("Error fetching locations:", error)
          setLocationSuggestions([])
        }
      } else {
        setLocationSuggestions([])
      }
    }

    const debounceTimer = setTimeout(fetchLocations, 300)
    return () => clearTimeout(debounceTimer)
  }, [value, open, justSelected])

  const handleLocationSelect = async (placeId: string, description: string) => {
    try {
      setIsLoadingLocation(true)
      const locationDetails = await geolocationService.getLocationFromPlaceId(placeId)

      onLocationSelect(locationDetails)
      setValue(description)
      setOpen(false)
      setJustSelected(true)
      setLocationSuggestions([])
    } catch (error) {
      console.error("Error fetching location details:", error)
    } finally {
      setIsLoadingLocation(false)
    }
  }

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        value={isLoadingLocation ? "Loading..." : value}
        onChange={(e) => {
          setValue(e.target.value)
          setJustSelected(false)
        }}
        disabled={isLoadingLocation}
        placeholder="Search for a location..."
        className={cn(
          "w-full h-12 py-3 px-4 text-base focus:border-nixerly-blue focus:ring-nixerly-blue/20",
          className,
        )}
        onFocus={() => {
          // Don't open dropdown on initial focus
          if (value.length > 2 && !justSelected && locationSuggestions.length > 0) {
            setOpen(true)
          }
        }}
      />
      {open && locationSuggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg">
          <Command>
            <CommandList>
              <CommandGroup>
                {locationSuggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.placeId}
                    value={suggestion.description}
                    onSelect={() => handleLocationSelect(suggestion.placeId, suggestion.description)}
                    className="py-3 cursor-pointer"
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", value === suggestion.description ? "opacity-100" : "opacity-0")}
                    />
                    {suggestion.description}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}
