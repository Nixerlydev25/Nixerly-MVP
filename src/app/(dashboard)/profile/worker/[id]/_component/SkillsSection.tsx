import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorkerProfileResponse } from '@/types/worker.types';
import React from 'react';

interface SkillsSectionProps {
  worker: WorkerProfileResponse;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ worker }) => {
  const formattedSkills =
    worker.skills?.map((skill: string) =>
      skill
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (l: string) => l.toUpperCase())
    ) || [];

  return (
    <Card className="pt-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 py-3">
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {formattedSkills.map((skill: string) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-blue-50 text-blue-700 border-blue-200 border"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
