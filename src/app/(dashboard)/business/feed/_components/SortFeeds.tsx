import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { SortOption, SortSelectOption } from '@/types/feed/feed.types';

const options: SortSelectOption[] = [
  { value: SortOption.RATING, label: 'Rating' },
  { value: SortOption.PRICE_LOW_TO_HIGH, label: 'Hourly Rate: Low to High' },
  { value: SortOption.PRICE_HIGH_TO_LOW, label: 'Hourly Rate: High to Low' },
];

function SortFeeds() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortValue = searchParams.get('sort') || SortOption.RATING;

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    // Reset to page 1 on sort change
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={sortValue} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SortFeeds;
