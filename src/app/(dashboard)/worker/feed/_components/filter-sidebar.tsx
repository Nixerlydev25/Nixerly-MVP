import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { JobStatus } from './types';
import { formatCurrency } from './utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { onboardingOptions } from '@/schema/onboarding/worker-onboarding.schema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { LocationSearch } from '@/components/location-search';

export function FilterSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSkills, setFilteredSkills] = useState(
    onboardingOptions.skills
  );

  // Derive filters from URL
  const filters = {
    status: searchParams.getAll('status'),
    skills: searchParams.get('skills')?.split(',') ?? [],
    minBudget: Number(searchParams.get('minBudget')) || 0,
    maxBudget: Number(searchParams.get('maxBudget')) || 10000,
    minHourlyRate: Number(searchParams.get('minHourlyRate')) || 0,
    maxHourlyRate: Number(searchParams.get('maxHourlyRate')) || 100,
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    country: searchParams.get('country') || '',
    search: searchParams.get('search') || '',
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 20,
    sortBy: (searchParams.get('sortBy') as 'createdAt') || 'createdAt',
    sortOrder: (searchParams.get('sortOrder') as 'desc') || 'desc',
  };

  const updateFilters = (newFilters: typeof filters) => {
    const params = new URLSearchParams();
    if (newFilters.status.length > 0)
      newFilters.status.forEach((s) => params.append('status', s));
    // Do NOT set skills or search here, always handle them manually below!
    if (newFilters.minBudget > 0)
      params.set('minBudget', String(newFilters.minBudget));
    if (newFilters.maxBudget < 10000)
      params.set('maxBudget', String(newFilters.maxBudget));
    if (newFilters.minHourlyRate > 0)
      params.set('minHourlyRate', String(newFilters.minHourlyRate));
    if (newFilters.maxHourlyRate < 100)
      params.set('maxHourlyRate', String(newFilters.maxHourlyRate));
    if (newFilters.city) params.set('city', newFilters.city);
    if (newFilters.state) params.set('state', newFilters.state);
    if (newFilters.country) params.set('country', newFilters.country);
    if (newFilters.page !== 1) params.set('page', String(newFilters.page));
    if (newFilters.limit !== 20) params.set('limit', String(newFilters.limit));
    if (newFilters.sortBy !== 'createdAt')
      params.set('sortBy', newFilters.sortBy);
    if (newFilters.sortOrder !== 'desc')
      params.set('sortOrder', newFilters.sortOrder);

    // Always remove any skills/search param that might have been added by URLSearchParams
    let query = params
      .toString()
      .replace(/(^|&)skills=[^&]*/g, '')
      .replace(/(^|&)search=[^&]*/g, '');

    // Append skills with literal comma if present (and do NOT encode)
    if (newFilters.skills.length > 0) {
      if (query && !query.endsWith('&')) query += '&';
      query += `skills=${newFilters.skills.join(',')}`;
    }
    // Append search as literal (not encoded)
    if (newFilters.search) {
      if (query && !query.endsWith('&')) query += '&';
      query += `search=${newFilters.search}`;
    }
    // Remove any trailing & or ? if query is empty
    router.push(query ? `?${query}` : '?');
  };

  const handleSkillChange = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    updateFilters({ ...filters, skills: newSkills });
  };

  const handleBudgetChange = (value: number[]) => {
    updateFilters({ ...filters, minBudget: value[0], maxBudget: value[1] });
  };

  const handleHourlyRateChange = (value: number[]) => {
    updateFilters({
      ...filters,
      minHourlyRate: value[0],
      maxHourlyRate: value[1],
    });
  };
  const handleSkillSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filtered = onboardingOptions.skills.filter((skill) =>
        skill.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
    } else {
      setFilteredSkills(onboardingOptions.skills);
    }
  };

  const clearFilters = () => {
    router.push('?');
  };

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.skills.length > 0 ||
    filters.minBudget > 0 ||
    filters.maxBudget < 10000 ||
    filters.minHourlyRate > 0 ||
    filters.maxHourlyRate < 100 ||
    filters.city !== '' ||
    filters.state !== '' ||
    filters.country !== '' ||
    filters.search !== '';

  // Handle location selection from LocationSearch
  const handleLocationSelect = (data: {
    city?: string;
    state?: string;
    country?: string;
  }) => {
    updateFilters({
      ...filters,
      city: data.city || '',
      state: data.state || '',
      country: data.country || '',
    });
  };

  return (
    <Card className="sticky top-4 rounded-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2 underlined "
          >
            Clear all
          </Button>
        </div>

        {/* Location filter */}
        <div className="mb-4">
          <Label htmlFor="location" className="text-sm font-medium mb-2 block">
            Location
          </Label>
          <div className="relative">
            <LocationSearch
              onLocationSelect={handleLocationSelect}
              className="w-full"
              defaultValue={
                filters.city || filters.state || filters.country || ''
              }
            />
          </div>
        </div>

        <Accordion
          type="multiple"
          defaultValue={['status', 'budget', 'hourlyRate', 'skills']}
          className="w-full"
        >
          {/* Job Status filter */}
          <AccordionItem value="status">
            <AccordionTrigger className="text-sm font-medium py-2">
              Job Status
            </AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                value={filters.status[0] || ''}
                onValueChange={(value) =>
                  updateFilters({ ...filters, status: value ? [value] : [] })
                }
                className="flex flex-col space-y-2"
              >
                {Object.entries(JobStatus).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <RadioGroupItem value={key} id={`status-${key}`} />
                    <Label
                      htmlFor={`status-${key}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          {/* Budget Range filter */}
          <AccordionItem value="budget">
            <AccordionTrigger className="text-sm font-medium py-2">
              Budget Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">
                    {formatCurrency(filters.minBudget)}
                  </span>
                  <span className="text-sm">
                    {formatCurrency(filters.maxBudget)}
                  </span>
                </div>
                <Slider
                  defaultValue={[filters.minBudget, filters.maxBudget]}
                  min={0}
                  max={10000}
                  step={100}
                  value={[filters.minBudget, filters.maxBudget]}
                  onValueChange={handleBudgetChange}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Hourly Rate filter */}
          <AccordionItem value="hourlyRate">
            <AccordionTrigger className="text-sm font-medium py-2">
              Hourly Rate
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">
                    {formatCurrency(filters.minHourlyRate)}/hr
                  </span>
                  <span className="text-sm">
                    {formatCurrency(filters.maxHourlyRate)}/hr
                  </span>
                </div>
                <Slider
                  defaultValue={[filters.minHourlyRate, filters.maxHourlyRate]}
                  min={0}
                  max={100}
                  step={5}
                  value={[filters.minHourlyRate, filters.maxHourlyRate]}
                  onValueChange={handleHourlyRateChange}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Skills filter */}
          <AccordionItem value="skills">
            <AccordionTrigger className="text-sm font-medium py-2">
              Skills
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
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
                    {filteredSkills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill.value}`}
                          checked={filters.skills.includes(skill.value)}
                          onCheckedChange={() => handleSkillChange(skill.value)}
                        />
                        <Label
                          htmlFor={`skill-${skill}`}
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
        </Accordion>
      </CardContent>
    </Card>
  );
}
