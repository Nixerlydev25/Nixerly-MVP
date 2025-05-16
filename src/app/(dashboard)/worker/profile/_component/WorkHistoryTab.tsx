import { WorkerProfileResponse } from '@/types/worker.types';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';

interface WorkHistoryTabProps {
  staticData: any
  worker: WorkerProfileResponse
}

const WorkHistoryTab: React.FC<WorkHistoryTabProps> = ({ staticData, worker }) => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 pb-3">
      <CardTitle>Work History</CardTitle>
      <CardDescription>
        Completed {worker.completedJobs || staticData.jobsCompleted} jobs with{' '}
        {staticData.successRate}% success rate
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-8">
        {staticData.workHistory.map((work: any, index: number) => (
          <div key={index} className={index > 0 ? 'border-t pt-6' : ''}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{work.title}</h3>
                <p className="text-gray-600">{work.client}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <StarIcon className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{work.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-500">{work.completedDate}</p>
              </div>
            </div>
            <p className="mt-3 text-gray-700">{work.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              {work.hours} hours worked
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default WorkHistoryTab;
