'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '@/helper/lib/utils';
import Metric from '../shared/Metric';
import { Button } from '@/helper/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/helper/components/ui/dropdown-menu';

interface Props {
  username: string;
  id: string;
  email: string;
  photoUrl: string;
  role: string;
  status: string;
  bio?: string;
  joinedAt?: Date;
}

const UserHorizontalCard = ({
  username,
  id,
  email,
  photoUrl,
  role,
  status,
  bio,
  joinedAt
}: Props) => {
  const [roleSet, setRoleSet] = useState<string>(role);

  const handleChangeRole = (newRole: string) => {
    setRoleSet(newRole);
    // TODO: update role on backend
  };

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div className="">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {/* {getTimestamp(createdAt)} */}
          </span>
          <Link href={`/user?userId=${id}`}>
            <div className="flex flex-row gap-6 items-center">
              <Image
                src={photoUrl}
                width={75}
                height={75}
                alt="profile picture"
              />
              <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
                @{username}
              </h3>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Metric
            imgUrl="/assets/icons/email.svg"
            alt="email icon"
            value={email}
            title=""
            textStyles="text-dark400_light800"
          ></Metric>
          <Metric
            imgUrl="/assets/icons/clock.svg"
            alt="clock icon"
            value={`Joined at: ${
              joinedAt ? getTimestamp(joinedAt) : 'May 2024'
            }`}
            title=""
            textStyles="text-dark400_light800"
          ></Metric>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-20">
                {roleSet[0].toUpperCase() + roleSet.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={roleSet}
                onValueChange={handleChangeRole}
              >
                <DropdownMenuRadioItem value="admin">
                  Admin
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="user">User</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="banned">
                  Banned
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default UserHorizontalCard;
