import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { StarIcon, ThumbsUp } from 'lucide-react';
import { WorkerProfileResponse } from '@/types/worker.types';
import { Button } from '@/components/ui/button';

interface ReviewsTabProps {
  staticData: any;
  worker: WorkerProfileResponse;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ staticData, worker }) => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 pb-3">
      <CardTitle>Client Reviews</CardTitle>
      <CardDescription>
        <div className="flex items-center">
          <StarIcon className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">
            {worker.avgRating || staticData.rating}
          </span>
          <span className="ml-1 text-gray-500">
            ({worker.completedJobs || staticData.jobsCompleted} reviews)
          </span>
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-8">
        {staticData.reviews.map((review: any, index: number) => (
          <div key={index} className={index > 0 ? 'border-t pt-6' : ''}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">
                  {review.client}{' '}
                  <span className="font-normal text-gray-500">
                    from {review.company}
                  </span>
                </h3>
                <div className="mt-1 flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(review.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {review.date}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8">
                <ThumbsUp className="mr-1 h-4 w-4" />
                Helpful
              </Button>
            </div>
            <p className="mt-3 text-gray-700">{review.content}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default ReviewsTab;
