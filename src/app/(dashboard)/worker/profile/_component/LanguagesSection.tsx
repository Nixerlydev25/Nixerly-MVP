import { WorkerLanguage } from '@/types/worker.types';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Globe, PencilIcon, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LanguagesSectionProps {
  languages: WorkerLanguage[] | any;
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages }) => (
  <Card className="pt-0 overflow-hidden">
    <CardHeader className="bg-gradient-to-r pt-3 from-green-50 to-green-100/50 pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center">
          <Globe className="mr-2 h-5 w-5 text-green-600" />
          Languages
        </CardTitle>
        <Button size="sm" variant="ghost" className="h-8 gap-1">
          <PencilIcon className="h-3 w-3" />
          Edit
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {languages.map((language, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <span className="font-medium">{language.name}:</span>
              <span className="ml-2 text-gray-600">{language.proficiency}</span>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" className="mt-2 gap-1">
          <PlusCircle className="h-4 w-4" />
          Add Language
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default LanguagesSection;
