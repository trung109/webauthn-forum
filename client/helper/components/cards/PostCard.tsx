'use client';
import { formatAndDivideNumber, getTimestamp } from '@/helper/lib/utils';
import Link from 'next/link';
import Metric from '../shared/Metric';
import RenderTag from '../shared/RenderTag';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { set } from 'zod';
interface Props {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    id: string;
    username: string;
    photoUrl: string;
  };
  upvotes: number;
  views: number;
  commentsCount: number;
  createdAt: Date;
  state?: string;
}
const PostCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  commentsCount,
  createdAt,
  state
}: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [approved, setApproved] = useState(false);
  const handleApproval = async () => {
    try {
      console.log(123);
      setApproved(true);
      setIsClicked(true);
      const response = await fetch(`/api/post/approvePost?postId=${_id}`, {
        cache: 'no-store',
        method: 'POST'
      });
    } catch (error) {
      console.log('Error ' + error);
    }
  };

  const handleDecline = async () => {
    try {
      console.log(123);
      setApproved(false);
      setIsClicked(true);
      const response = await fetch(`/api/post/declinePost?postId=${_id}`, {
        cache: 'no-store',
        method: 'POST'
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div className="">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {/* {getTimestamp(createdAt)} */}
          </span>
          <Link href={`/post?postId=${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name}></RenderTag>
        ))}
      </div>
      <div>
        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <Metric
            imgUrl={author.photoUrl}
            alt="User"
            value={author.username}
            title={` - asked ${getTimestamp(createdAt)}`}
            href={`/profile/${author.id}`}
            textStyles="body-medium text-dark400_light700"
          ></Metric>

          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          ></Metric>
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Comments"
            value={commentsCount}
            title=" Comments"
            textStyles="small-medium text-dark400_light800"
          ></Metric>
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Views"
            value={formatAndDivideNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          ></Metric>
          {state === 'pending' &&
            (!isClicked ? (
              <div className="flex flex-row">
                <Button
                  onClick={handleApproval}
                  className="primary-gradient w-fit !text-light-900 flex mr-2"
                >
                  Approve
                </Button>
                <Button onClick={handleDecline} className="btn-secondary">
                  Decline
                </Button>
              </div>
            ) : (
              <Badge className={approved ? 'text-green-500' : 'text-red-500'}>
                {approved ? 'Approved' : 'Declined'}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
