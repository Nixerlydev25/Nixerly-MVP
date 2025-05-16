import { WorkerExperience } from '@/types/worker.types';
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { PencilIcon, PlusCircle, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExperienceTabProps {
  freelancer: any;
  // experience: WorkerExperience[] | any;
}

const ExperienceTab: React.FC<ExperienceTabProps> = ({
  freelancer,
  // experience,
}) => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 pb-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Experiences</CardTitle>
          <CardDescription>
            Completed {freelancer.jobsCompleted} jobs with{' '}
            {freelancer.successRate}% success rate
          </CardDescription>
        </div>
        <Button size="sm" variant="outline" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Add Portfolio Item
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-8">
        {freelancer.workHistory.map((work, index) => (
          <div key={index} className={index > 0 ? 'border-t pt-6' : ''}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold">{work.title}</h3>
                <p className="text-gray-600">{work.client}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="flex items-center">
                    <StarIcon className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">
                      {work.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{work.completedDate}</p>
                </div>
                <Button size="sm" variant="ghost" className="h-8">
                  <PencilIcon className="h-4 w-4" />
                </Button>
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

export default ExperienceTab;
