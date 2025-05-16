import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorkerProfileResponse } from '@/types/worker.types';
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

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
    <Card className='pt-0 overflow-hidden' >
      <CardHeader className="bg-gradient-to-r pt-3 from-indigo-50 to-indigo-100/50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Skills</CardTitle>
          <Button size="sm" variant="ghost" className="h-8 gap-1">
            <PencilIcon className="h-3 w-3" />
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {formattedSkills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className={`${
                skill.includes('React')
                  ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                  : skill.includes('Node')
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : skill.includes('Type')
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : skill.includes('Mongo')
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : skill.includes('AWS')
                  ? 'bg-orange-50 text-orange-700 border-orange-200'
                  : skill.includes('Docker')
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : skill.includes('Graph')
                  ? 'bg-pink-50 text-pink-700 border-pink-200'
                  : skill.includes('Express')
                  ? 'bg-gray-50 text-gray-700 border-gray-200'
                  : skill.includes('Next')
                  ? 'bg-black bg-opacity-5 text-gray-800 border-gray-300'
                  : 'bg-purple-50 text-purple-700 border-purple-200'
              } border`}
            >
              {skill}
            </Badge>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="rounded-full h-7 gap-1"
          >
            <PlusCircle className="h-3 w-3" />
            Add Skill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
