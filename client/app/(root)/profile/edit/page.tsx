'use client';
import Profile from '@/helper/components/forms/Profile';
import { User } from '@/helper/models/models';
import { useEffect, useState } from 'react';
import { useUser } from '@/app/context/UserContext';
import Verfied from '@/helper/components/shared/Verfied';
const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user, setUser } = useUser();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     const response = await fetch("/api/user/me");
  //     if (response.ok) {
  //       const data = await response.json();
  //       setUser(data);
  //     }
  //   };
  //   fetchUserDetails();
  // }, []);
  return (
    <>
      <Verfied status={user.status} />;
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile userId={user?.id} user={user} />
      </div>
    </>
  );
};

export default page;
