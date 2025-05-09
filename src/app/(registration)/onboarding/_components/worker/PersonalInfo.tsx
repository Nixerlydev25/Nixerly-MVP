import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { WorkerOnboardingSchema, onboardingOptions } from "@/schema/onboarding/worker-onboarding.schema";
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks";
import { useEffect, useState } from "react";
import { TWorkerProfile } from "@/types/auth";
import { Textarea } from "@/components/ui/textarea";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hook/common/useDebounce";
import { geolocationService } from "@/services/geolocation.service";

interface LocationSuggestion {
  placeId: string;
  description: string;
}

export const PersonalInfo = () => {
  const { control, trigger, watch, setValue } = useFormContext<WorkerOnboardingSchema>();
  const { goToNextStep } = useOnboardingNavigation();
  const { mutateAsync: updateUserWorkerProfile } = useUpdateWorkerProfile();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedProficiency, setSelectedProficiency] = useState<string | null>(null);
  const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  
  const debouncedSearchInput = useDebounce(searchInput, 300);
  const formData = watch();
  const languages = watch("languages") || [];

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchInput.trim()) {
        try {
          const suggestions = await geolocationService.getLocationSuggestions(debouncedSearchInput);
          setLocationSuggestions(suggestions);
        } catch (error) {
          console.error("Error fetching location suggestions:", error);
        }
      } else {
        setLocationSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchInput]);

  const handleLocationSelect = async (placeId: string) => {
    try {
      setIsLoadingLocation(true);
      const locationData = await geolocationService.getLocationFromPlaceId(placeId);
      setValue("location", locationData.formattedAddress);
      setValue("city", locationData.city);
      setValue("state", locationData.state);
      setValue("country", locationData.country);
      setOpen(false);
    } catch (error) {
      console.error("Error getting location details:", error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleAddLanguage = () => {
    if (selectedLanguage && selectedProficiency) {
      const currentLanguages = formData.languages || [];
      if (!currentLanguages.some(l => l.name === selectedLanguage)) {
        const updatedLanguages = [
          ...currentLanguages,
          { name: selectedLanguage, proficiency: selectedProficiency }
        ];
        setValue("languages", updatedLanguages);
        trigger("languages");
      }
      // Reset selections after adding
      setSelectedLanguage(null);
      setSelectedProficiency(null);
    }
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = [...languages];
    newLanguages.splice(index, 1);
    setValue("languages", newLanguages);
    trigger("languages");
  };

  const handleContinue = async () => {
    const fieldsToValidate = [
      "title",
      "description",
      "location",
      "city",
      "state",
      "country",
      "languages",
    ] as const;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      const { title, description, location, city, state, country, languages } = formData;
      
      const workerProfileData = {
        title: title || null,
        description: description || null,
        location: location || null,
        city: city || null,
        state: state || null,
        country: country || null,
        languages: languages || [],
      } as Partial<TWorkerProfile>;
      
      await updateUserWorkerProfile(workerProfileData);
      goToNextStep();
    }
  };

  return (
    <Card className="p-10 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <h2 className="text-3xl font-semibold mb-8 text-nixerly-darkblue">Personal Information</h2>
      <div className="space-y-8">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">Professional Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. Senior Plumber, Master Electrician" 
                  {...field} 
                  className="w-full h-12 py-3 px-4 text-base focus:border-nixerly-blue focus:ring-nixerly-blue/20" 
                />
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Enter your professional title that best describes your role
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">Professional Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your experience, expertise, and the services you offer..." 
                  className="min-h-[120px] py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20" 
                  {...field} 
                />
              </FormControl>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Provide a detailed description of your professional background and services
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-nixerly-darkgray font-medium">Location</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-full h-12 justify-between py-3 px-4 text-base focus:border-nixerly-blue focus:ring-nixerly-blue/20",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isLoadingLocation}
                    >
                      {isLoadingLocation ? "Loading..." : field.value || "Search for a location..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search location..."
                      value={searchInput}
                      onValueChange={setSearchInput}
                      className="h-12"
                    />
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {locationSuggestions.map((suggestion) => (
                        <CommandItem
                          key={suggestion.placeId}
                          value={suggestion.description}
                          onSelect={() => handleLocationSelect(suggestion.placeId)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === suggestion.description ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {suggestion.description}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription className="text-sm text-nixerly-darkgray/50 mt-2">
                Search and select your location
              </FormDescription>
              <FormMessage className="text-nixerly-coral mt-1" />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel className="text-lg text-nixerly-darkgray font-medium">Languages</FormLabel>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={selectedLanguage || ""}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {onboardingOptions.languages
                    .filter(lang => !languages.some(l => l.name === lang.value))
                    .map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedProficiency || ""}
                onValueChange={setSelectedProficiency}
              >
                <SelectTrigger className="py-2.5 focus:border-nixerly-blue focus:ring-nixerly-blue/20">
                  <SelectValue placeholder="Select proficiency" />
                </SelectTrigger>
                <SelectContent>
                  {onboardingOptions.proficiencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              onClick={handleAddLanguage}
              disabled={!selectedLanguage || !selectedProficiency}
              className="w-full bg-nixerly-blue hover:bg-nixerly-darkblue text-white h-10 text-base font-medium shadow-nixerly-button transition-all duration-200"
            >
              Add Language
            </Button>
          </div>

          {languages.length > 0 && (
            <div className="mt-4">
              <div className="text-sm text-nixerly-darkgray mb-2">Selected Languages:</div>
              <div className="flex flex-wrap gap-2">
                {languages.map((langItem, index) => {
                  const languageObj = onboardingOptions.languages.find(l => l.value === langItem.name);
                  const proficiencyObj = onboardingOptions.proficiencyLevels.find(p => p.value === langItem.proficiency);
                  
                  return (
                    <div 
                      key={index} 
                      className="bg-nixerly-ultralightblue border border-nixerly-lightblue text-nixerly-darkblue px-3 py-1.5 rounded-md flex items-center gap-2"
                    >
                      <span>
                        {languageObj?.label || langItem.name} ({proficiencyObj?.label || langItem.proficiency})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(index)}
                        className="text-nixerly-darkblue hover:text-nixerly-coral transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <FormMessage className="text-nixerly-coral" />
        </div>

        <div className="flex justify-end pt-8">
          <Button 
            type="button" 
            onClick={handleContinue}
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-10 py-3 h-12 text-base font-medium shadow-nixerly-button transition-all duration-200"
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};
