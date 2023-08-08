"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs';
import { sidebarLinks } from '@/constants';
import { FiLogOut } from 'react-icons/fi';
// FiLogOut

const LeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === '/profile') link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && 'bg-blue '}`}
            >
              <div className='flex items-center gap-5'>
                <span className='text-light-1'>{link.icon}</span>
                <p className='text-light-1 max-lg:hidden'>{link.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className='flex items-center gap-5 p-4 cursor-pointer hover:bg-blue hover:rounded-md'>
                <span className='text-light-1'><FiLogOut/></span>
                <p className='text-light-1 max-lg:hidden'>Logout</p>
              </div>
            
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSideBar;
