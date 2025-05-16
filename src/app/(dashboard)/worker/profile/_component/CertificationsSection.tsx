import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award, PencilIcon, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CertificationsSectionProps {
  certifications: any[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
}) => (
  <Card>
    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-purple-600" />
          Certifications
        </CardTitle>
        <Button size="sm" variant="ghost" className="h-8 gap-1">
          <PencilIcon className="h-3 w-3" />
          Edit
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={index} className={index > 0 ? 'border-t pt-4' : ''}>
            <h4 className="font-medium">{cert.name}</h4>
            <p className="text-gray-600">{cert.issuer}</p>
            <p className="text-sm text-gray-500">{cert.year}</p>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full mt-2 gap-1">
          <PlusCircle className="h-4 w-4" />
          Add Certification
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default CertificationsSection;
