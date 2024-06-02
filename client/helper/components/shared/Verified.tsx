import { useUser } from '@/app/context/UserContext';
import React from 'react';
import Link from 'next/link';

interface Props {
  status: string;
}


const Verified = ({ status }: Props) => {

  const {user, setUser} = useUser()
  return (
    !(user.username === "" || status === "verified") &&
      (<div>
        <p className="bg-orange-200 p-4 rounded-md mb-[30px]">
          Your account is unverified, please verify your account to continue.{' '}
          <Link href="/api/auth/getActivationToken" className="underline">
            Click here
          </Link>
          <span> to send a new verification email.</span>
        </p>
      </div>)
  );
};

export default Verified;
