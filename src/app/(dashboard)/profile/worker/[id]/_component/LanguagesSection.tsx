import { WorkerLanguage } from '@/types/worker.types';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Globe } from 'lucide-react';

interface LanguagesSectionProps {
  languages: WorkerLanguage[];
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages }) => (
  <Card className="pt-0 overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 py-3">
      <CardTitle className="flex items-center">
        <Globe className="mr-2 h-5 w-5 text-green-600" />
        Languages
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {languages?.map((language) => (
          <div key={language.id} className="flex items-center justify-between">
            <div>
              <span className="font-medium">
                {language.language.charAt(0) +
                  language.language.slice(1).toLowerCase()}
                :
              </span>
              <span className="ml-2 text-gray-600">
                {language.proficiency.charAt(0) +
                  language.proficiency.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default LanguagesSection;
