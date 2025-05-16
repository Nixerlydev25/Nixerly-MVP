import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkerProfileResponse } from '@/types/worker.types';
import { PencilIcon } from 'lucide-react';
import React from 'react';

interface AboutSectionProps {
  worker: WorkerProfileResponse | any;
}

const AboutSection: React.FC<AboutSectionProps> = ({ worker }) => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 pb-3">
      <div className="flex items-center justify-between">
        <CardTitle>About</CardTitle>
        <Button size="sm" variant="ghost" className="h-8 gap-1">
          <PencilIcon className="h-3 w-3" />
          Edit
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="whitespace-pre-line text-gray-700">{worker.bio}</div>
    </CardContent>
  </Card>
);

export default AboutSection;
