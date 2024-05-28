import { Button } from "@/helper/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
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
        {/* If not signed in */}
        <Link href="/auth/login">
          <Button className="primary-gradient bg-[#ff7000] text-light-900">
            Sign In
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
