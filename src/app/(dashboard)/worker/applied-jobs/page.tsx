'use client';

import { useGetAppliedJobs } from '@/hook/worker/worker.hook';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import { Input } from '@/components/ui/input';
import { X, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ApplicationDetails } from './components/application-details';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  CalendarDays,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  ChevronLeft,
  ChevronRight,
  CalendarRange,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import JobApplicationsSkeleton from './components/JobApplicationSkeleton';

interface FilterState {
  search: string;
  dateRange: DateRange | undefined;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function AppliedJobsPage() {
  const { data, isLoading } = useGetAppliedJobs();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('search') || '',
    dateRange: undefined,
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has('page')) {
      params.set('page', '1');
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);

    if (filters.dateRange?.from && filters.dateRange?.to) {
      const startDate = new Date(filters.dateRange.from);
      startDate.setUTCHours(0, 0, 0, 0);
      params.set('startDate', startDate.toISOString());
      const endDate = new Date(filters.dateRange.to);
      endDate.setUTCHours(23, 59, 59, 999);
      params.set('endDate', endDate.toISOString());
    }

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;

    router.replace(newUrl, { scroll: false });
  }, [debouncedSearch, filters.dateRange, router]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    params.set('page', newPage.toString());

    if (filters.search) params.set('search', filters.search);
    if (filters.dateRange?.from) {
      const startDate = new Date(filters.dateRange.from);
      startDate.setUTCHours(0, 0, 0, 0);
      params.set('startDate', startDate.toISOString());
    }
    if (filters.dateRange?.to) {
      const endDate = new Date(filters.dateRange.to);
      endDate.setUTCHours(23, 59, 59, 999);
      params.set('endDate', endDate.toISOString());
    }

    router.push(`?${params.toString()}`);
  };

  if (isLoading) return <JobApplicationsSkeleton />;

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  // function getStatusColor(status: string) {
  //   switch (status.toLowerCase()) {
  //     case 'pending':
  //       return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  //     case 'accepted':
  //       return 'bg-green-100 text-green-800 border-green-200';
  //     case 'rejected':
  //       return 'bg-red-100 text-red-800 border-red-200';
  //     case 'withdrawn':
  //       return 'bg-gray-100 text-gray-800 border-gray-200';
  //     default:
  //       return 'bg-blue-100 text-blue-800 border-blue-200';
  //   }
  // }

  // function formatDuration(duration: string) {
  //   return duration
  //     .replace(/_/g, ' ')
  //     .toLowerCase()
  //     .replace(/\b\w/g, (l) => l.toUpperCase());
  // }

  const clearFilters = () => {
    setFilters({
      search: '',
      dateRange: undefined,
    });
  };

  const hasActiveFilters = filters.search || filters.dateRange;

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            My Job Applications
          </h1>
          <p className="text-muted-foreground mt-2">
            Track the status of your job applications and manage your
            opportunities
          </p>
        </div>

        {/* Filters and Results Summary */}
        <div className="flex items-center justify-between mb-6 gap-4">
          {/* Left side - Results count */}
          <div>
            <p className="text-sm text-muted-foreground">
              Showing {data?.applications?.length} of{' '}
              {data?.pagination?.totalCount} applications
            </p>
          </div>

          {/* Right side - Filters */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            {/* Date Range Picker */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <CalendarRange className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <div className="p-3 border-b">
                      <h3 className="font-medium text-sm">Select Date Range</h3>
                      <p className="text-xs text-muted-foreground">
                        Filter applications by date range
                      </p>
                    </div>
                    <Calendar
                      mode="range"
                      selected={filters.dateRange}
                      onSelect={(range) => updateFilter('dateRange', range)}
                      numberOfMonths={2}
                      initialFocus
                    />
                    {filters.dateRange && (
                      <div className="p-3 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateFilter('dateRange', undefined)}
                          className="w-full"
                        >
                          Clear Date Range
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter by date range</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-sm font-medium">Active filters:</span>
            {filters.search && (
              <Badge variant="secondary" className="gap-1">
                Search: "{filters.search}"
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter('search', '')}
                />
              </Badge>
            )}
            {filters.dateRange?.from && (
              <Badge variant="secondary" className="gap-1">
                From: {formatDate(filters.dateRange.from.toISOString())}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    updateFilter(
                      'dateRange',
                      filters.dateRange?.to
                        ? { to: filters.dateRange.to }
                        : undefined
                    )
                  }
                />
              </Badge>
            )}
            {filters.dateRange?.to && (
              <Badge variant="secondary" className="gap-1">
                To: {formatDate(filters.dateRange.to.toISOString())}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    updateFilter(
                      'dateRange',
                      filters.dateRange?.from
                        ? { from: filters.dateRange.from }
                        : undefined
                    )
                  }
                />
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        )}

        {/* Applications List */}
        <div className="space-y-6">
          {data?.applications?.map((application: any) => (
            <Card
              key={application.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">
                      {application.job.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {application.job.businessProfile.companyName}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {application.job.location.city},{' '}
                        {application.job.location.state}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        Applied {formatDate(application.createdAt)}
                      </div>
                    </div>
                  </div>
                  {/* <Badge className={getStatusColor(application.status)}>
                    {application.status}
                  </Badge> */}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {application.job.description}
                </p>

                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>
                      ${application.job.hourlyRateMin} - $
                      {application.job.hourlyRateMax}/hr
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDuration(application.duration)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Available:{' '}
                      {formatDate(application.workerStartDateAvailability)}
                    </span>
                  </div>
                </div> */}

                <div className="flex justify-between items-center pt-2">
                  {/* <div className="text-xs text-muted-foreground">
                    Last updated: {formatDate(application.updatedAt)}
                  </div> */}
                  <div></div>
                  <div className="flex gap-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="w-[600px] sm:w-[700px] sm:max-w-none">
                        <SheetHeader>
                          <SheetTitle>Application Details</SheetTitle>
                          <SheetDescription>
                            Complete details for your job application and the
                            position.
                          </SheetDescription>
                        </SheetHeader>
                        <ApplicationDetails application={application} />
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results State */}
        {data?.applications?.length === 0 &&
          data?.pagination?.totalCount > 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">
                  No applications match your filters
                </h3>
                <p className="text-sm">
                  Try adjusting your search criteria or clearing some filters
                </p>
              </div>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          )}

        {/* Pagination */}
        {data?.applications?.length > 10 && (
          <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-muted-foreground">
              Showing page {data?.pagination?.currentPage} of{' '}
              {data?.pagination?.totalPages} ({data?.applications?.length} of{' '}
              {data?.pagination?.totalCount} applications)
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handlePageChange(data.pagination.currentPage - 1)
                }
                disabled={data?.pagination?.currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from(
                  { length: data?.pagination?.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <Button
                    key={page}
                    variant={
                      page === data?.pagination?.currentPage
                        ? 'default'
                        : 'outline'
                    }
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handlePageChange(data.pagination.currentPage + 1)
                }
                disabled={!data?.pagination?.hasMore}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {data?.pagination?.totalCount === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium">No applications yet</h3>
              <p className="text-sm">Start applying to jobs to see them here</p>
            </div>
            <Button>Browse Jobs</Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
