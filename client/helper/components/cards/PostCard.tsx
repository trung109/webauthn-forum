'use client';
import { formatAndDivideNumber, getTimestamp } from '@/helper/lib/utils';
import Link from 'next/link';
import Metric from '../shared/Metric';
import RenderTag from '../shared/RenderTag';
import { Button } from '../ui/button';
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
  const handleApproval = async () => {
    // try {
    //   const res = await fetch(`/api/admin/post/${_id}/approve`, {
    //     method: 'PUT'
    //   });
    //   if (res.ok) {
    //     alert('Post approved successfully');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const handleDecline = async () => {
    // try {
    //   const res = await fetch(`/api/admin/post/${_id}/decline`, {
    //     method: 'PUT'
    //   });
    //   if (res.ok) {
    //     alert('Post declined successfully');
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
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
          {state === 'pending' && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;