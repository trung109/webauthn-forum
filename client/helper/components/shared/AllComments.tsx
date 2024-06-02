import React from 'react';
import { User } from '@/helper/models/models';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '@/helper/lib/utils';
import { get } from 'http';
interface Props {
  postId: string;
  author: User;
  totalComments: number;
}
import { useState } from 'react';
import { MdPreview } from 'md-editor-rt';

const AllComments = ({ postId, author, totalComments }: Props) => {
  const [id] = useState('preview-only');

  // TODO: get all comments
  const sample_comments = [
    {
      id: '1',
      content: 'This is a comment',
      author: {
        id: '1',
        username: 'user1',
        email: 'user1@example.com',
        photoUrl: '/assets/images/default-avatar.jpg'
      },
      createdAt: new Date()
    },
    {
      id: '2',
      content: 'This is another comment',
      author: {
        id: '2',
        username: 'user2',
        email: 'user2@example.com',
        photoUrl: '/assets/images/default-avatar.jpg'
      },
      createdAt: new Date()
    }
  ];
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {sample_comments.length} Comments
        </h3>
      </div>

      <div>
        {sample_comments.map((comment) => (
          <article key={comment.id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/user?userId=${comment.author.id}`}
                  className="flex flex-1 items-center gap-1 sm:items-center"
                >
                  <Image
                    src={comment.author.photoUrl}
                    width={18}
                    height={18}
                    alt="profile picture"
                    className="rounded-full object-cover max-sm:mt-05"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {comment.author.username}
                    </p>
                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1 ml-0.5">
                      {' '}
                      commented {getTimestamp(comment.createdAt)}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <MdPreview
              editorId={id}
              modelValue={comment.content}
              className="bg-inherit"
              language="en-US"
            />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllComments;
