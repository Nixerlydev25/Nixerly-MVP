import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface CertificationsSectionProps {
  certifications: any[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
}) => (
  <Card className="pt-0 overflow-hidden">
    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 py-3">
      <CardTitle className="flex items-center">
        <Award className="mr-2 h-5 w-5 text-purple-600" />
        Certifications
      </CardTitle>
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
      </div>
    </CardContent>
  </Card>
);

export default CertificationsSection;
