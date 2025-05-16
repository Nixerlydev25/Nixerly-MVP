import { WorkerEducation } from '@/types/worker.types';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  education: WorkerEducation[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => (
  <Card className="pt-0 overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-cyan-50 to-cyan-100/50 py-3">
      <CardTitle className="flex items-center">
        <GraduationCap className="mr-2 h-5 w-5 text-cyan-600" />
        Education
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {education?.map((edu) => (
          <div key={edu.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <h4 className="font-medium">{edu.school}</h4>
            <p className="text-gray-600">
              {edu.degree} in {edu.fieldOfStudy}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(edu.startDate).toLocaleDateString()} -
              {edu.currentlyStudying
                ? ' Present'
                : edu.endDate
                ? ` ${new Date(edu.endDate).toLocaleDateString()}`
                : ''}
            </p>
            <p className="mt-2 text-gray-700">{edu.description}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default EducationSection;
