import { useState, useEffect } from "react";
import { useDebounce } from "@/hook/common/useDebounce";
import { geolocationService } from "@/services/geolocation.service";

export interface LocationDetails {
  city: string;
  state: string;
  country: string;
}

interface LocationSuggestion {
  placeId: string;
  description: string;
}

interface UseLocationSearchProps {
  defaultValue?: string;
  onLocationSelect?: (location: LocationDetails) => void;
}

interface UseLocationSearchReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  searchInput: string;
  setSearchInput: (input: string) => void;
  displayValue: string;
  isLoadingLocation: boolean;
  locationSuggestions: LocationSuggestion[];
  handleLocationSelect: (placeId: string, description: string) => Promise<void>;
}

export function useLocationSearch({
  defaultValue = "",
  onLocationSelect,
}: UseLocationSearchProps = {}): UseLocationSearchReturn {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [displayValue, setDisplayValue] = useState(defaultValue);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);

  const debouncedSearchInput = useDebounce(searchInput, 300);

  useEffect(() => {
    const fetchLocations = async () => {
      if (debouncedSearchInput.length > 2) {
        try {
          const suggestions = await geolocationService.getLocationSuggestions(debouncedSearchInput);
          setLocationSuggestions(suggestions);
        } catch (error) {
          console.error("Error fetching locations:", error);
          setLocationSuggestions([]);
        }
      } else {
        setLocationSuggestions([]);
      }
    };

    fetchLocations();
  }, [debouncedSearchInput]);

  const handleLocationSelect = async (placeId: string, description: string) => {
    try {
      setIsLoadingLocation(true);
      const locationDetails = await geolocationService.getLocationFromPlaceId(placeId);
      
      if (onLocationSelect) {
        onLocationSelect(locationDetails);
      }
      setDisplayValue(description);
      setOpen(false);
    } catch (error) {
      console.error("Error fetching location details:", error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return {
    open,
    setOpen,
    searchInput,
    setSearchInput,
    displayValue,
    isLoadingLocation,
    locationSuggestions,
    handleLocationSelect,
  };
} 