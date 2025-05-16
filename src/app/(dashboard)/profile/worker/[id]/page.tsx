'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft } from 'lucide-react';
import { useGetWorkerById } from '@/hook/worker/worker.hook';
import { useParams } from 'next/navigation';
import {
  AboutSection,
  CertificationsSection,
  EducationSection,
  ExperienceSection,
  HireCard,
  LanguagesSection,
  ProfileHeader,
  ProfileStats,
  ReviewsTab,
  SkillsSection,
  WorkHistoryTab,
} from './_component';

// Sample freelancer data for sections that will remain static
const staticData = {
  rating: 4.9,
  jobsCompleted: 127,
  successRate: 98,
  lastActive: '2 hours ago',
  responseTime: '< 1 hour',
  avatar: '/placeholder.svg?height=200&width=200',
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      year: '2020',
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB, Inc.',
      year: '2019',
    },
  ],
  workHistory: [
    {
      title: 'E-commerce Platform Redesign',
      client: 'Fashion Retailer',
      completedDate: 'March 2023',
      rating: 5.0,
      hours: 160,
      description:
        "Completely redesigned and rebuilt the client's e-commerce platform using React, Next.js, and Node.js. Implemented a headless CMS, optimized performance, and integrated with payment gateways.",
    },
    {
      title: 'Real-time Analytics Dashboard',
      client: 'SaaS Company',
      completedDate: 'November 2022',
      rating: 4.9,
      hours: 120,
      description:
        'Developed a real-time analytics dashboard using React, D3.js, and WebSockets. The dashboard provides insights into user behavior and system performance.',
    },
    {
      title: 'Mobile App Backend',
      client: 'Health Tech Startup',
      completedDate: 'July 2022',
      rating: 5.0,
      hours: 80,
      description:
        'Built a scalable backend for a health tracking mobile app using Node.js, Express, and MongoDB. Implemented authentication, data storage, and RESTful APIs.',
    },
  ],
  reviews: [
    {
      client: 'Sarah M.',
      company: 'Fashion Retailer',
      rating: 5.0,
      date: 'March 15, 2023',
      content:
        'Alex was exceptional to work with. He understood our requirements perfectly and delivered a solution that exceeded our expectations. His communication was clear and timely, and he was proactive in suggesting improvements to our initial design. Would definitely hire again!',
    },
    {
      client: 'Michael T.',
      company: 'SaaS Company',
      rating: 4.9,
      date: 'November 22, 2022',
      content:
        "Working with Alex was a great experience. He's technically skilled and also understands business requirements well. The dashboard he built has become an essential tool for our team and customers. Highly recommended.",
    },
    {
      client: 'Jennifer K.',
      company: 'Health Tech Startup',
      rating: 5.0,
      date: 'July 30, 2022',
      content:
        "Alex delivered our backend ahead of schedule and with all requirements met. He's a clear communicator and was able to explain complex technical concepts to our non-technical team members. His work is clean, well-documented, and easy to maintain.",
    },
  ],
  preferredProjectLength: '3+ months',
};

export default function FreelancerProfile() {
  const [isSaved, setIsSaved] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data: worker, isLoading } = useGetWorkerById(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Worker not found
      </div>
    );
  }

  // Format full name
  const fullName = `${worker.user?.firstName || ''} ${
    worker.user?.lastName || ''
  }`.trim();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-600"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to search results
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <ProfileHeader
              fullName={fullName}
              worker={worker}
              saved={isSaved}
              onSave={setIsSaved}
            />
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 transition-colors hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="work"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 transition-colors hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                >
                  Work History
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 transition-colors hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-8">
                <AboutSection worker={worker} />
                <SkillsSection worker={worker} />
                <ExperienceSection experience={worker.experience} />
                <div className="grid gap-6 md:grid-cols-2">
                  <EducationSection education={worker.education} />
                  <CertificationsSection
                    certifications={staticData.certifications}
                  />
                </div>
                <LanguagesSection languages={worker.languages} />
              </TabsContent>
              <TabsContent value="work" className="mt-6 space-y-6">
                <WorkHistoryTab staticData={staticData} worker={worker} />
              </TabsContent>
              <TabsContent value="reviews" className="mt-6 space-y-6">
                <ReviewsTab staticData={staticData} worker={worker} />
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <HireCard worker={worker} staticData={staticData} />
            <ProfileStats worker={worker} staticData={staticData} />
          </div>
        </div>
      </div>
    </div>
  );
}
