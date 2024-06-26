import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/shared/Navbar";

export default function WebAuthnLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
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
            </nav>
            <div className="flex justify-center items-center h-screen">
                {children}
            </div>
        </div>

    );
}