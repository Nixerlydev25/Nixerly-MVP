import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useModalStore } from '@/store/model.store';
import { ModalType } from '@/types/model';
import { WorkerProfileResponse } from '@/types/worker.types';
import {
  BookmarkIcon,
  CheckCircle2,
  Clock,
  MapPin,
  MoreHorizontal,
  StarIcon,
  Share2,
  PencilIcon,
  Eye,
  FileEdit,
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ProfileHeaderProps {
  freelancer: WorkerProfileResponse | any;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ freelancer }) => {
  const [isPublic, setIsPublic] = React.useState(true);
  const { openModal} = useModalStore()
  const fullName = `${freelancer.user?.firstName || ''} ${
    freelancer.user?.lastName || ''
  }`.trim();

  return (
    <div className="relative rounded-lg border bg-white p-6 shadow-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-50 opacity-70"></div>
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
      <div className="relative">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex-shrink-0 relative group">
            <Image
              src={freelancer.avatar || '/placeholder.svg'}
              width={120}
              height={120}
              alt={freelancer.user?.firstName || 'User'}
              className="rounded-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 rounded-full flex items-center justify-center opacity-0 group-hover:bg-opacity-30 group-hover:opacity-100 transition-all duration-200">
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 text-white"
              >
                <PencilIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {fullName}
                  </h1>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-lg text-gray-600">{freelancer.title}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1 h-4 w-4" />
                  {freelancer.city}, {freelancer.state}, {freelancer.country}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye className="h-4 w-4" />
                  {isPublic ? 'Public View' : 'Private View'}
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsPublic(!isPublic)}>
                      {isPublic ? (
                        <>
                          <BookmarkIcon className="mr-2 h-4 w-4" />
                          Set to private
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Set to public
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>  openModal(ModalType.EDIT_PROFILE, freelancer )} >
                      <FileEdit className="mr-2 h-4 w-4" />
                      Edit profile
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* <div className="mt-3 flex items-center gap-2">
              <p className="text-gray-700">{freelancer?.tagline}</p>
              <Button size="icon" variant="ghost" className="h-6 w-6">
                <PencilIcon className="h-3 w-3" />
              </Button>
            </div> */}

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center">
                <StarIcon className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{freelancer?.avgRating}</span>
                <span className="ml-1 text-gray-500">
                  ({10} reviews)
                </span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                {freelancer.successRate}% Job Success
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-gray-500" />
                <span>{freelancer.responseTime} response time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
