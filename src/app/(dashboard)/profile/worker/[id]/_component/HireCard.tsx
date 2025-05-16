import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { WorkerProfileResponse } from '@/types/worker.types';
import React from 'react';

interface HireCardProps {
  worker: WorkerProfileResponse;
  staticData: any
}

const HireCard: React.FC<HireCardProps> = ({ worker, staticData }) => (
  <div className="rounded-lg border bg-gradient-to-b from-white to-blue-50 p-6 shadow-sm">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-lg"></div>
    <div className="mb-4 text-center">
      <div className="text-2xl font-bold text-blue-600">
        ${worker.hourlyRate}
      </div>
      <div className="text-gray-600">per hour</div>
    </div>

    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Availability</span>
        <span className="font-medium">
          {worker.availability ? 'Available' : 'Unavailable'}
        </span>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Location</span>
        <span className="font-medium">
          {worker.city}, {worker.state}
        </span>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Last active</span>
        <span className="font-medium">{staticData.lastActive}</span>
      </div>
    </div>

    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
      Contact {worker.user?.firstName || 'Worker'}
    </Button>
    <Button variant="outline" className="mt-3 w-full">
      Invite to Job
    </Button>
  </div>
);

export default HireCard;
