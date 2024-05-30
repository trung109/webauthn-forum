"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const sample_user = {
    username: "",
    id: "",
    email: "",
    photoUrl: "",
    role: "",
    status: ""
  };


  return (
    <>
      <div className='flex flex-col'></div>
    </>
  );
};

export default Page;
