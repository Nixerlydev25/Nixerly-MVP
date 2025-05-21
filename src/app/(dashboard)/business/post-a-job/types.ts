export const JobStatus = {
  OPEN: 'Open',
  CLOSED: 'Closed',
  FILLED: 'Filled',
  EXPIRED: 'Expired',
} as const;

export type JobStatusType = typeof JobStatus[keyof typeof JobStatus]; 