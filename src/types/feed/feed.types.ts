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
  sort?: 'rating' | 'price_low_to_high' | 'price_high_to_low';
  search?: string;
}

export interface AppliedJobsFilter {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}