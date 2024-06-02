'use client';
import { useUser } from '@/app/context/UserContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/helper/components/ui/button';
const sidebarLinks = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/home',
    label: 'Home'
  },
  {
    imgURL: '/assets/icons/users.svg',
    route: '/community',
    label: 'Community'
  },
  {
    imgURL: '/assets/icons/question.svg',
    route: '/create-post',
    label: 'Create Post'
  },
  {
    imgURL: '/assets/icons/account.svg',
    route: '/profile/myProfile',
    label: 'My Profile'
  },
  {
    imgURL: '/assets/icons/dashboard.svg',
    route: '/admin/dashboard',
    label: 'Dashboard',
    role: 'admin'
  }
];
const LeftSideBar = () => {
  const { user } = useUser();
  console.log(user.role);
  const pathname = usePathname();

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar no-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks
          .filter((item) => !item.role || item.role === user.role)
          .map((item) => {
            const isActive =
              (pathname.includes(item.route) && item.route.length > 1) ||
              pathname === item.route;
            return (
              <Link
                key={item.route}
                href={item.route}
                className={`${
                  isActive
                    ? 'primary-gradient rounded-lg text-light-900'
                    : 'dark: text-dark300_light900'
                } flex items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${isActive ? '' : 'invert-colors'}`}
                />
                <p
                  className={`${
                    isActive ? 'base-bold' : 'base-medium'
                  } max-lg:hidden `}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default LeftSideBar;
