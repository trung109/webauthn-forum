import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
interface Props {
    user: {
        username: string;
        id: string;
        email: string;
        photoUrl: string;
        role: string;
        status: string;
    }
}
const UserCard = ({user}: Props) => {
  return (
    <Link
    href={`profile/user?userId=${user.id}`} className='shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]'>
        <article className='background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8'>
            <Image
            src={user.photoUrl}
            alt='User Avatar'
            width={100}
            height={100}
            className='rounded-full'
            />

            <div className='mt-4 text-center'>
                <h3 className='h3-bold text-dark200_light900 line-clamp-1'>
                    Full Name
                </h3>
                <p className='body-reular text-dark500_light500 mt-2'>@{user.username}</p>
            </div>
        </article>
    </Link>
  )
}

export default UserCard
