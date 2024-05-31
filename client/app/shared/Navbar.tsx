"use client";
import { Button } from "@/helper/components/ui/button";
// import { deleteCookie, getCookie } from "cookies-next";
import GlobalSearch from "@/helper/components/shared/search/GlobalSearch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const SAMPLE_USER = {
    username: "",
    id: "",
    email: "",
    photoUrl: "",
    role: "",
    status: "",
  };
  const [user, setUser] = useState(SAMPLE_USER);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch("/api/user/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    };
    fetchUserDetails();
  }, []);

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfileRedirect = () => {
    router.push(`/profile/user?userId=${user.id}`);
    setDropdownVisible(false);
  };

  const handlerProfileRedirect = () => {
    router.push(`/profile/myProfile`);
    setDropdownVisible(false);
  };

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout");
    if (response.status === 302) {
      setUser(SAMPLE_USER);
    } else {
      alert("Something went wrong");
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
      <GlobalSearch />
      <div className="flex-between gap-5">
        {user.username ? (
          <div className="relative flex items-center gap-4">
            <Image
              src={user.photoUrl}
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
                  onClick={() => handlerProfileRedirect()}
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
