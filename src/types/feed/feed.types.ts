import { Certificate, Portfolio } from "../worker.types";

export interface CardProps {
  id: string;
  title: string;
  avatar: string;
  skills: string[];
  rating: number;
  name: string;
  location: string;
  jobsCompleted: number;
  hourlyRate: number;
  certificates: Certificate[];
  portfolio: Portfolio[];
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
  sort?: "rating" | "price_low_to_high" | "price_high_to_low";
  search?: string;
}

export interface AppliedJobsFilter {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}