import { WorkerExperience } from '@/types/worker.types';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface ExperienceSectionProps {
  experience: WorkerExperience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
}) => (
  <Card className="pt-0 overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 py-3">
      <CardTitle className="flex items-center">
        <Award className="mr-2 h-5 w-5 text-amber-600" />
        Experience
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {experience?.map((exp) => (
          <div key={exp.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <h4 className="font-medium">{exp.title}</h4>
            <p className="text-gray-600">{exp.company}</p>
            <p className="text-sm text-gray-500">
              {new Date(exp.startDate).toLocaleDateString()} -
              {exp.currentlyWorking
                ? ' Present'
                : exp.endDate
                ? ` ${new Date(exp.endDate).toLocaleDateString()}`
                : ''}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {exp.city}, {exp.state}, {exp.country}
            </p>
            <p className="mt-2 text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default ExperienceSection;
