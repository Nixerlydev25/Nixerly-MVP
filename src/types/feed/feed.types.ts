export interface CardProps {
  id: string | number;
  name: string;
  title: string;
  avatar?: string;
  rating: number;
  jobsCompleted: number;
  hourlyRate: number;
  successRate: number;
  location: string;
  skills: string[];
}

export interface FeedsFilter {
  page?: number;
  limit?: number;
  skills?: string[];
  minHourlyRate?: number;
  maxHourlyRate?: number;
  minTotalEarnings?: number;
  maxTotalEarnings?: number;
  minAvgRating?: number;
  maxAvgRating?: number;
  sort?: SortOption;
}

export interface SortSelectOption {
  value: SortOption;
  label: string;
}

export enum SortOption {
  RATING = 'rating',
  PRICE_LOW_TO_HIGH = 'price_low_to_high',
  PRICE_HIGH_TO_LOW = 'price_high_to_low',
}