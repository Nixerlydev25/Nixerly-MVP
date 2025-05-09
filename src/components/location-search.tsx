"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { geolocationService } from "@/services/geolocation.service"

export interface LocationDetails {
  city: string
  state: string
  country: string
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
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
              if (value.length > 2 && !justSelected) {
                setOpen(true)
              }
            }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No location found.</CommandEmpty>
            <CommandGroup>
              {locationSuggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.placeId}
                  value={suggestion.description}
                  onSelect={() => handleLocationSelect(suggestion.placeId, suggestion.description)}
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
      </PopoverContent>
    </Popover>
  )
}
