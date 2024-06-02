'use client';
import React from 'react';
import { User } from '@/helper/models/models';
import { useState, useEffect } from 'react';
import UserSettings from '@/helper/components/forms/UserSettings';
import { useUser } from '@/app/context/UserContext';
import Verified from '@/helper/components/shared/Verified';
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
      <Verified status={user.status} />;
      <h1 className="h1-bold text-dark100_light900">Change my password</h1>
      <div className="mt-9">
        <UserSettings userId={user?.id} user={user} />
      </div>
    </>
  );
};

export default page;
