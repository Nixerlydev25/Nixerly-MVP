import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { WorkerProfileResponse } from '@/types/worker.types';
import {
  BookmarkIcon,
  CheckCircle2,
  Clock,
  Flag,
  HeartIcon,
  MapPin,
  MoreHorizontal,
  StarIcon,
  Share2,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';


interface ProfileHeaderProps {
  worker: WorkerProfileResponse;
  fullName: string;
  onSave?: (save: boolean) => void;
  saved?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  worker,
  fullName,
  onSave,
  saved,
}) => {
  const [isSaved, setIsSaved] = useState(saved || false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(isSaved);
    }
  };

  return (
    <div>
      <div className="relative rounded-lg border bg-white p-6 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-50 opacity-70"></div>
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        <div className="relative">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex-shrink-0">
              <Image
                src={worker.avatar || '/placeholder.svg?height=200&width=200'}
                width={120}
                height={120}
                alt={fullName}
                className="rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {fullName}
                  </h1>
                  <p className="text-lg text-gray-600">{worker.title}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1 h-4 w-4" />
                    {worker.city}, {worker.state}, {worker.country}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={isSaved ? 'text-red-500' : 'text-gray-400'}
                    onClick={() => handleSave()}
                  >
                    <HeartIcon
                      className={`h-5 w-5 ${isSaved ? 'fill-red-500' : ''}`}
                    />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Flag className="mr-2 h-4 w-4" />
                        Report this profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BookmarkIcon className="mr-2 h-4 w-4" />
                        Save to list
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center">
                  <StarIcon className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{worker.avgRating}</span>
                  <span className="ml-1 text-gray-500">
                    ({worker.completedJobs} reviews)
                  </span>
                </div>
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  {worker.successRate}% Job Success
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-gray-500" />
                  <span>{worker.responseTime} response time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
