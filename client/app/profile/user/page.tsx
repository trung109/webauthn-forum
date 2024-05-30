"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  
  return (
    <div>
      // TODO: Fetch and display userid
      {userId}
    </div>
  );
};

export default Page;
