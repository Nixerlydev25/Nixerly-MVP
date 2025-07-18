import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ChevronDownIcon, FilterIcon, ListIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { onboardingOptions } from '@/schema/onboarding/worker-onboarding.schema';
import GridIcon from '@/components/Icons/GridIcon';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {Info} from "lucide-react"

interface FiltersFeedsProps {
  viewMode: 'card' | 'list';
  setViewMode: (viewMode: 'card' | 'list') => void;
}
function FiltersFeeds({ viewMode, setViewMode }: FiltersFeedsProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleSkillsCount] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter state
  const searchParams = useSearchParams();
  const router = useRouter();

  const [minHourlyRate, setMinHourlyRate] = useState<string>(
    searchParams.get('minHourlyRate') || '0'
  );
  const [maxHourlyRate, setMaxHourlyRate] = useState<string>(
    searchParams.get('maxHourlyRate') || '100'
  );
  const [minTotalEarnings, setMinTotalEarnings] = useState<string>(
    searchParams.get('minTotalEarnings') || ''
  );
  const [maxTotalEarnings, setMaxTotalEarnings] = useState<string>(
    searchParams.get('maxTotalEarnings') || ''
  );
  const [minAvgRating, setMinAvgRating] = useState<string>(
    searchParams.get('minAvgRating') || ''
  );
  const [maxAvgRating, setMaxAvgRating] = useState<string>(
    searchParams.get('maxAvgRating') || ''
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(() => {
    const skillsParam = searchParams.get('skills');
    return skillsParam ? skillsParam.split(',') : [];
  });

  const [visibleSkills, setVisibleSkills] = useState(
    onboardingOptions.skills.slice(0, visibleSkillsCount)
  );

  // const handleShowMoreSkills = () => {
  //   setVisibleSkillsCount((prevCount) => prevCount + 10);
  // };

  // const handleShowLessSkills = () => {
  //   setVisibleSkillsCount(10);
  // };

  // Update URL when filters change
  const updateFilters = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    // Hourly Rate
    if (minHourlyRate) params.set('minHourlyRate', minHourlyRate);
    else params.delete('minHourlyRate');
    if (maxHourlyRate) params.set('maxHourlyRate', maxHourlyRate);
    else params.delete('maxHourlyRate');

    // Total Earnings
    // if (minTotalEarnings) params.set("minTotalEarnings", minTotalEarnings);
    // else params.delete("minTotalEarnings");
    // if (maxTotalEarnings) params.set("maxTotalEarnings", maxTotalEarnings);
    // else params.delete("maxTotalEarnings");

    // Avg Rating
    // if (minAvgRating) params.set("minAvgRating", minAvgRating);
    // else params.delete("minAvgRating");
    // if (maxAvgRating) params.set("maxAvgRating", maxAvgRating);
    // else params.delete("maxAvgRating");

    // Skills - Use a custom approach to avoid URL encoding the comma
    if (selectedSkills.length > 0) {
      // Remove skills parameter first to avoid appending
      params.delete('skills');

      // Build the URL with properly formatted skills parameter
      const baseUrl = `?${params.toString()}`;
      const skillsParam = `&skills=${selectedSkills.join(',')}`;

      router.push(baseUrl + skillsParam);
      return; // Skip the default router.push below
    } else {
      params.delete('skills');
    }

    // Reset to page 1 on filter change
    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  // Handle skill checkbox change
  const handleSkillChange = (skillId: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills((prev) => [...prev, skillId]);
    } else {
      setSelectedSkills((prev) => prev.filter((id) => id !== skillId));
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setMinHourlyRate('0');
    setMaxHourlyRate('100');
    setMinTotalEarnings('');
    setMaxTotalEarnings('');
    setMinAvgRating('');
    setMaxAvgRating('');
    setSelectedSkills([]);

    // Remove all filter params
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete('minHourlyRate');
    // params.delete("sort");
    params.delete('maxHourlyRate');
    params.delete('minTotalEarnings');
    params.delete('maxTotalEarnings');
    params.delete('minAvgRating');
    params.delete('maxAvgRating');
    params.delete('skills');
    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  // Update filters when any value changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateFilters();
    }, 500); // Debounce to avoid too many URL updates

    return () => clearTimeout(timeoutId);
  }, [
    minHourlyRate,
    maxHourlyRate,
    minTotalEarnings,
    maxTotalEarnings,
    minAvgRating,
    maxAvgRating,
    selectedSkills,
  ]);

  const handleSkillSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = onboardingOptions.skills.filter((skill) =>
        skill.label.toLowerCase().includes(value.toLowerCase())
      );
      setVisibleSkills(filtered);
    } else {
      setVisibleSkills(onboardingOptions.skills);
    }
  };

  // const handleHourlyRateChange = (value: number[]) => {
  //   setMinHourlyRate(value[0].toString());
  //   setMaxHourlyRate(value[1].toString());
  // };

  const handleMinHourlyRateChange = (value: number[]) => {
    const newValue = value[0];
    if (newValue <= Number(maxHourlyRate)) {
      setMinHourlyRate(newValue.toString());
    }
  };

  const handleMaxHourlyRateChange = (value: number[]) => {
    const newValue = value[0];
    if (newValue >= Number(minHourlyRate)) {
      setMaxHourlyRate(newValue.toString());
    }
  };

  return (
    <div>
      {/* Filters - Desktop */}
      <div className="hidden w-full lg:block ">
        <Card className="sticky top-4   border rounded-3xl border-nixerly-bussinessborder">
          <div className="">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-blue-600 underlined "
                onClick={handleClearFilters}
              >
                Clear All
              </Button>
            </div>
            <Separator className="my-4 w-full"  />

   

            <div className="space-y-6 px-4">
              <Accordion
                type="multiple"
                defaultValue={['skills', 'hourlyRate']}
                // collapsible
              >
                <AccordionItem  value="skills">
                  <AccordionTrigger className="text-sm font-medium py-2">
                    Skills
                        {/* <Info /> */}
                  </AccordionTrigger>
               
                  <AccordionContent>
                    <div className="space-y-4 p-0.5">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search skills..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={handleSkillSearchChange}
                        />
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        <div className="flex flex-col space-y-2">
                          {visibleSkills.map((skill, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`skill-${skill.id}`}
                                checked={selectedSkills.includes(skill.id)}
                                onCheckedChange={(checked) =>
                                  handleSkillChange(skill.id, checked === true)
                                }
                              />
                              <Label
                                htmlFor={`skill-${skill.id}`}
                                className="text-sm font-normal cursor-pointer"
                              >
                                {skill.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* <AccordionItem value="hourlyRate">
                  <AccordionTrigger className="text-sm font-medium py-2">
                    Hourly Rate
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-sm">Maximum Hourly Rate</Label>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">${maxHourlyRate}/hr</span>
                          </div>
                          <Slider
                            defaultValue={[Number(maxHourlyRate)]}
                            min={0}
                            max={100}
                            step={5}
                            value={[Number(maxHourlyRate)]}
                            onValueChange={handleMaxHourlyRateChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Minimum Hourly Rate</Label>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">${minHourlyRate}/hr</span>
                          </div>
                          <Slider
                            defaultValue={[Number(minHourlyRate)]}
                            min={0}
                            max={100}
                            step={5}
                            value={[Number(minHourlyRate)]}
                            onValueChange={handleMinHourlyRateChange}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem> */}
              </Accordion>
            </div>
          </div>
        </Card>
      </div>
      {/* Mobile Filters and View Toggle */}
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
        >
          <FilterIcon className="h-4 w-4" />
          Filters
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform ${
              mobileFiltersOpen ? 'rotate-180' : ''
            }`}
          />
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border bg-white p-1">
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              className={`h-8 w-8 p-0 ${
                viewMode === 'card' ? 'bg-blue-600' : ''
              }`}
              onClick={() => setViewMode('card')}
            >
              <GridIcon />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className={`h-8 w-8 p-0 ${
                viewMode === 'list' ? 'bg-blue-600' : ''
              }`}
              onClick={() => setViewMode('list')}
            >
              <ListIcon />
            </Button>
          </div>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="hourly-asc">Low to High</SelectItem>
              <SelectItem value="hourly-desc">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile Filters Panel */}
      {mobileFiltersOpen && (
        <div className="mb-6 rounded-lg border bg-white p-4 shadow-sm lg:hidden">
          <div className="grid grid-cols-2 gap-4">
            {/* Hourly Rate */}
            <div>
              <h3 className="mb-2 font-medium">Hourly Rate</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 rounded border px-2 py-1 text-sm"
                  value={minHourlyRate}
                  onChange={(e) => setMinHourlyRate(e.target.value)}
                  min={0}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 rounded border px-2 py-1 text-sm"
                  value={maxHourlyRate}
                  onChange={(e) => setMaxHourlyRate(e.target.value)}
                  min={0}
                />
              </div>
            </div>
            {/* Total Earnings */}
            {/* <div>
              <h3 className="mb-2 font-medium">Total Earnings</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 rounded border px-2 py-1 text-sm"
                  value={minTotalEarnings}
                  onChange={(e) => setMinTotalEarnings(e.target.value)}
                  min={0}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 rounded border px-2 py-1 text-sm"
                  value={maxTotalEarnings}
                  onChange={(e) => setMaxTotalEarnings(e.target.value)}
                  min={0}
                />
              </div>
            </div> */}
            {/* Avg Rating */}
            {/* <div>
              <h3 className="mb-2 font-medium">Average Rating</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 rounded border px-2 py-1 text-sm"
                  value={minAvgRating}
                  onChange={(e) => setMinAvgRating(e.target.value)}
                  min={0}
                  max={5}
                  step={0.1}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 rounded border px-2 py-1 text-sm"
                  value={maxAvgRating}
                  onChange={(e) => setMaxAvgRating(e.target.value)}
                  min={0}
                  max={5}
                  step={0.1}
                />
              </div>
            </div> */}
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              className="mr-2"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setMobileFiltersOpen(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltersFeeds;
