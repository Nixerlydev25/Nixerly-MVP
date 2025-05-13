import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ChevronDownIcon, FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { onboardingOptions } from '@/schema/onboarding/worker-onboarding.schema';
function FiltersFeeds() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [showMoreSkills, setShowMoreSkills] = useState(false);
  const skillsToShow = showMoreSkills ? onboardingOptions.skills : onboardingOptions.skills.slice(0, 10);
  return (
    <div>
      {/* Filters - Desktop */}
      <div className="hidden w-full lg:block lg:w-64">
        <div className="sticky top-24 rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" className="h-8 text-blue-600">
              Clear All
            </Button>
          </div>
          <Separator className="my-4" />

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="mb-2 font-medium">Category</h3>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="development">Development & IT</SelectItem>
                  <SelectItem value="design">Design & Creative</SelectItem>
                  <SelectItem value="writing">Writing</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="admin">Admin Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Skills Filter */}
            <div>
              <h3 className="mb-2 font-medium">Skills</h3>
              <div className="space-y-2">
                {skillsToShow.map((skill, index) => {
                  return (
                    <div
                      className="flex items-center space-x-2"
                      key={`${skill.id}_${index}`}
                    >
                      <Checkbox id={`skill_${skill.id}`} />
                      <Label htmlFor={`skill_${skill.id}`}>{skill.label}</Label>
                    </div>
                  );
                })}
                {onboardingOptions.skills.length > 5 && (
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-1 h-auto p-0 text-blue-600"
                    onClick={() => setShowMoreSkills(!showMoreSkills)}
                  >
                    {showMoreSkills ? 'Show less' : 'Show more'}
                  </Button>
                )}
              </div>

              {/* Hourly Rate Filter */}
              <div>
                <h3 className="mb-2 font-medium">Hourly Rate</h3>
                <div className="space-y-4">
                  <Slider defaultValue={[0, 100]} max={100} step={1} />
                  <div className="flex items-center justify-between text-sm">
                    <span>$0</span>
                    <span>$100+</span>
                  </div>
                </div>
              </div>

              {/* Job Success Filter */}
              <div>
                <h3 className="mb-2 font-medium">Job Success</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="any" />
                    <Label htmlFor="any">Any Job Success</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="90plus" />
                    <Label htmlFor="90plus">90% & up</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="80plus" />
                    <Label htmlFor="80plus">80% & up</Label>
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="mb-2 font-medium">Location</h3>
                <Select defaultValue="anywhere">
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anywhere">Anywhere</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
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
                className="h-8 w-8 p-0"
                onClick={() => setViewMode('card')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setViewMode('list')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
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
              <div>
                <h3 className="mb-2 font-medium">Category</h3>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="development">
                      Development & IT
                    </SelectItem>
                    <SelectItem value="design">Design & Creative</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Hourly Rate</h3>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Rate</SelectItem>
                    <SelectItem value="0-25">$0 - $25</SelectItem>
                    <SelectItem value="25-50">$25 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100plus">$100+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Job Success</h3>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder="Select success rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Success Rate</SelectItem>
                    <SelectItem value="90plus">90% & up</SelectItem>
                    <SelectItem value="80plus">80% & up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="mb-2 font-medium">Location</h3>
                <Select defaultValue="anywhere">
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anywhere">Anywhere</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" className="mr-2">
                Clear All
              </Button>
              <Button size="sm" onClick={() => setMobileFiltersOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FiltersFeeds;
