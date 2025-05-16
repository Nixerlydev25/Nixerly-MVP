import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { WorkerProfileResponse } from '@/types/worker.types';
import { Progress } from '@/components/ui/progress';

interface ProfileStatsProps {
  worker: WorkerProfileResponse;
  staticData: any;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ staticData, worker }) => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3">
      <CardTitle className="text-base">Profile Stats</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-gray-600">Jobs Completed</span>
          <span className="font-medium">
            {worker.completedJobs || staticData.jobsCompleted}
          </span>
        </div>
        <Progress value={85} className="h-2 bg-blue-100" />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-gray-600">On Budget</span>
          <span className="font-medium">100%</span>
        </div>
        <Progress value={100} className="h-2 bg-green-100" />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-gray-600">On Time</span>
          <span className="font-medium">98%</span>
        </div>
        <Progress value={98} className="h-2 bg-indigo-100" />
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-gray-600">Repeat Hire Rate</span>
          <span className="font-medium">75%</span>
        </div>
        <Progress value={75} className="h-2 bg-purple-100" />
      </div>
    </CardContent>
  </Card>
);

export default ProfileStats;
