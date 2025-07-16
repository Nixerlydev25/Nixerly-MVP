import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { BookmarkIcon, StarIcon, UserIcon, ChevronDownIcon, ChevronUpIcon, ScrollText, FolderIcon, ExternalLinkIcon } from 'lucide-react';
import { CardProps } from '@/types/feed/feed.types';
import { formateSkills } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';

function CardFeeds({
  id,
  title,
  avatar,
  skills,
  rating,
  name,
  location,
  jobsCompleted,
  hourlyRate,
  certificates,
  portfolio,
}: CardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetailsToShow = certificates.length > 0 || portfolio.length > 0;

  return (
    <Card key={id} className="overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex gap-4 cursor-pointer" onClick={() => router.push(`/profile/worker/${id}`)}>
            <Image
              src={avatar || '/placeholder.svg'}
              width={60}
              height={60}
              alt={name}
              className="rounded-full object-cover w-16 h-16"
            />
            <div>
              <h3 className="text-[#0E121B] font-sans text-xl font-medium leading-none">{name}</h3>
              <p className="text-sm text-[#0E121B] font-sans pt-2 not-italic font-normal leading-none tracking-tight">{title}</p>
              {/* <div className="mt-1 flex items-center">
                <StarIcon className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="ml-2 text-xs text-gray-500">
                  ({jobsCompleted} jobs)
                </span>
              </div> */}
            </div>
            
          </div>
          {/* <Button variant="ghost" size="icon">
            <BookmarkIcon className="h-5 w-5" />
          </Button> */}
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-2 mt-3 ">
          {skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className='font-sans text-xs not-italic font-medium leading-[14.05px]  text-nixerly-businesslabel  '>
              {formateSkills(skill)}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="">
        <p className=" text-[#0E121B] font-sans text-base not-italic font-normal leading-[17.56px] tracking-tight">
          {/* <UserIcon className="mr-1 inline-block h-4 w-4" /> */}
            <Image src="/locationblack.svg" alt="location icon" width={12} height={12} className="mr-1 inline-block " />
          {location}
        </p>
        
        
        {hasDetailsToShow && (
          <Button 
            variant="ghost" 
            className="w-full mt-4 flex items-center justify-center gap-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>Hide Details <ChevronUpIcon className="h-4 w-4" /></>
            ) : (
              <>Show Details <ChevronDownIcon className="h-4 w-4" /></>
            )}
          </Button>
        )}

        {isExpanded && (
          <div className="mt-4 border-t bg-gray-50/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
              {certificates.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <div className="p-1.5 bg-blue-100 rounded-md">
                      <ScrollText className="h-4 w-4 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Certificates</h4>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                      {certificates.length}
                    </span>
                  </div>
                  <ScrollArea className="h-[180px] pr-2">
                    <div className="space-y-2">
                      {certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="group flex items-start gap-3 p-2 hover:bg-white rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                          {cert.assets.length > 0 ? (
                            <div className="relative flex-shrink-0">
                              <Image
                                src={cert.assets[0].url || "/placeholder.svg"}
                                width={100}
                                height={100}
                                alt={cert.name}
                                className="rounded-md object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-md flex items-center justify-center flex-shrink-0">
                              <ScrollText className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                {cert.name}
                              </p>
                              <ExternalLinkIcon className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {cert.issuingOrg}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {portfolio.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <div className="p-1.5 bg-purple-100 rounded-md">
                      <FolderIcon className="h-4 w-4 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Portfolio</h4>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                      {portfolio.length}
                    </span>
                  </div>
                  <ScrollArea className="h-[180px] pr-2">
                    <div className="space-y-2">
                      {portfolio.map((item) => (
                        <div
                          key={item.id}
                          className="group flex items-start gap-3 p-2 hover:bg-white rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                          {item.assets.length > 0 ? (
                            <div className="relative flex-shrink-0">
                              <Image
                                src={item.assets[0].url || "/placeholder.svg"}
                                width={100}
                                height={100}
                                alt={item.title}
                                className="rounded-md object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-purple-100 rounded-md flex items-center justify-center flex-shrink-0">
                              <FolderIcon className="h-4 w-4 text-purple-600" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm text-gray-900 group-hover:text-purple-600 transition-colors duration-200">
                                {item.title}
                              </p>
                              <ExternalLinkIcon className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CardFeeds;
