import { WorkerEducation } from '@/types/worker.types';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { GraduationCap, PencilIcon, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/store/model.store';
import { ModalType } from '@/types/model';

interface EducationSectionProps {
  education: WorkerEducation[] | any;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const { openModal } = useModalStore();
  return (
    <Card className='pt-0 overflow-hidden'>
      <CardHeader className="bg-gradient-to-r pt-3 from-cyan-50 to-cyan-100/50 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-cyan-600" />
            Education
          </CardTitle>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-1"
            onClick={() => openModal(ModalType.EDIT_EDUCATION, { education })}
          >
            <PencilIcon className="h-3 w-3" />
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={index} className={index > 0 ? 'border-t pt-4' : ''}>
              <h4 className="font-medium">{edu.institution}</h4>
              <p className="text-gray-600">{edu.degree}</p>
              <p className="text-sm text-gray-500">{edu.year}</p>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2 gap-1"
            onClick={() => openModal(ModalType.EDIT_EDUCATION, { education })}
          >
            <PlusCircle className="h-4 w-4" />
            Add Education
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationSection;
