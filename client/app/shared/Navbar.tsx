"use client";
import { Button } from "@/helper/components/ui/button";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const SAMPLE_USER = {
    username: "",
  };
  const [user, setUser] = useState(SAMPLE_USER);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const token = getCookie('token');
  console.log(token)
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = getCookie('token');
      console.log(token)
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/user', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUser(data.user);
          
        } catch (error) {
          console.error('Error fetching user:', error);
          deleteCookie('token');
        }
      }
      console.log(1)
    };

    fetchUserDetails();
  }, []);

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    const response = await fetch('/api/logout')
    if (response.status === 302) {
      setUser({
        username: "",
      });
    } else {
        alert('Something went wrong')
    }

    setDropdownVisible(false);
  };

  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="BuFFerOverflow Logo"
        ></Image>
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
          BuFFer<span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <div className="flex-between gap-5">
        {user.username ? (
          <div className="relative flex items-center gap-4">
            <Image
              src="/assets/icons/user.svg"
              width={40}
              height={40}
              alt="Profile"
              className="rounded-full shadow-xl border-[2px] cursor-pointer"
              onClick={handleProfileClick}
            ></Image>
            <p className="text-dark-100 dark:text-light-900">{user.username}</p>
            {dropdownVisible && (
              <div className="absolute top-[35px] right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <button
                  className="block w-full px-4 py-2 text-left text-dark-100 dark:text-light-900 hover:bg-gray-200"
                  onClick={() => console.log("Show Profile")}
                >
                  Profile
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-dark-100 dark:text-light-900 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth/login">
            <Button className="primary-gradient bg-[#ff7000] text-light-900">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
