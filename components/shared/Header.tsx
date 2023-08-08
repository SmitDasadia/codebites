"use client"
import React from "react";
import { OrganizationSwitcher, SignedIn, SignOutButton,useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';

import { FiLogOut } from 'react-icons/fi';

const Header = () => {
  const router = useRouter();
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image
          src={"https://cdn-icons-png.flaticon.com/512/876/876019.png"}
          alt="logo"
          width={40}
          height={28}
        />
        {/* <h1 className='text-heading3-bold text-blue'>{"</>"}</h1> */}
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          {" "}
          CodeBites
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <div className="flex items-center gap-5 p-4 cursor-pointer hover:bg-blue hover:rounded-md">
                <span className="text-light-1">
                  <FiLogOut />
                </span>
                <p className="text-light-1 max-lg:hidden">Logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
              
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Header;
