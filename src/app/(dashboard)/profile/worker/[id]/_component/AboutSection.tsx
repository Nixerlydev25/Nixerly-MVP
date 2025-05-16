import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkerProfileResponse } from '@/types/worker.types';
import React from 'react';

interface AboutSectionProps {
  worker: WorkerProfileResponse;
}

const AboutSection: React.FC<AboutSectionProps> = ({ worker }) => (
  <div>
    {/* About section */}
    <Card className="pt-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 py-3">
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-line text-gray-700">
          {worker.description}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AboutSection;
