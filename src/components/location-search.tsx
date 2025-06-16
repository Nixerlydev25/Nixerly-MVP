"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Check, Loader2 } from "lucide-react"
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
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [locationSuggestions, setLocationSuggestions] = useState<Array<{ placeId: string; description: string }>>([])
  const [justSelected, setJustSelected] = useState(false)
  const [hasUserTyped, setHasUserTyped] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchLocations = async () => {
      if (value.length > 2 && !justSelected && hasUserTyped) {
        try {
          setIsLoadingSuggestions(true)
          setOpen(true) // Open dropdown when loading starts
          const suggestions = await geolocationService.getLocationSuggestions(value)
          setLocationSuggestions(suggestions)
        } catch (error) {
          console.error("Error fetching locations:", error)
          setLocationSuggestions([])
        } finally {
          setIsLoadingSuggestions(false)
        }
      } else {
        setLocationSuggestions([])
      }
    }

    const debounceTimer = setTimeout(fetchLocations, 300)
    return () => clearTimeout(debounceTimer)
  }, [value, justSelected, hasUserTyped])

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
      <div className="relative">
        <Input
          ref={inputRef}
          value={isLoadingLocation ? "Loading..." : value}
          onChange={(e) => {
            setValue(e.target.value)
            setJustSelected(false)
            setHasUserTyped(true)
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
        {(isLoadingLocation || isLoadingSuggestions) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
      {open && (isLoadingSuggestions || locationSuggestions.length > 0) && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg">
          <Command>
            <CommandList>
              <CommandGroup>
                {isLoadingSuggestions ? (
                  <div className="p-3 text-sm text-muted-foreground flex items-center gap-2 animate-pulse">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading suggestions...
                  </div>
                ) : (
                  locationSuggestions.map((suggestion) => (
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
                  ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}
