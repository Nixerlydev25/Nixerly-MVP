import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WorkerProfileResponse } from '@/types/worker.types';

interface ProfileCompletenessProps {
  freelancer: WorkerProfileResponse | any;
}

function ProfileCompleteness({ freelancer }: ProfileCompletenessProps) {
  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Profile Completeness</CardTitle>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            {freelancer.profileStats.profileCompleteness}% Complete
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <Progress
          value={freelancer.profileStats.profileCompleteness}
          className="h-2 bg-green-100 [&>div]:bg-green-500"
        />
        <div className="mt-4 grid gap-2">
          {freelancer.profileStats.profileCompleteness < 100 && (
            <div className="rounded-md bg-blue-50 p-3 text-sm">
              <div className="font-medium text-blue-800">
                Complete your profile to increase visibility
              </div>
              <ul className="mt-2 list-disc pl-5 text-blue-700">
                <li>Add a portfolio item</li>
                <li>Complete your work preferences</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCompleteness;
