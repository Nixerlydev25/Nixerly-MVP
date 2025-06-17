import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { BookmarkIcon, StarIcon, UserIcon } from 'lucide-react';
import { CardProps } from '@/types/feed/feed.types';
import { formateSkills } from '@/lib/utils';
import { useRouter } from 'next/navigation';

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
}: CardProps) {
  const router = useRouter();
  return (
    <Card key={id} className="overflow-hidden cursor-pointer">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex gap-4"  onClick={() => router.push(`/profile/worker/${id}`)} >
            <Image
              src={avatar || '/placeholder.svg'}
              width={60}
              height={60}
              alt={name}
              className="rounded-full object-cover w-16 h-16"
            />
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-gray-600">{title}</p>
              <div className="mt-1 flex items-center">
                <StarIcon className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="ml-2 text-xs text-gray-500">
                  ({jobsCompleted} jobs)
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <BookmarkIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="mb-3 text-sm text-gray-600">
          <UserIcon className="mr-1 inline-block h-4 w-4" />
          {location}
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill) => {
            return (
              <Badge key={skill} variant="secondary">
                {formateSkills(skill)}
              </Badge>
            );
          })}
        </div>
      </CardContent>

    </Card>
  );
}

export default CardFeeds;
