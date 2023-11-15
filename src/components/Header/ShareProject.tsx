'use client';
import React, { useEffect, useState } from 'react';
import Spinner from '../Shared/Spinner';
import Link from 'next/link';
import ProfileMenu from './ProfileMenu';
import { SessionInterface } from '@/shared/types';
import { usePathname } from 'next/navigation';

interface IProps {
  session: SessionInterface;
}

const ShareProject = ({ session }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      setIsLoading(false);
    }
  }, [pathname]);

  return (
    <>
      {isLoading && <Spinner />}
      <Link
        href="/create-project"
        className=" font-medium textHover active:text-green-800 "
        onClick={() => setIsLoading(true)}
      >
        Share work
      </Link>
      <ProfileMenu session={session} />
    </>
  );
};

export default ShareProject;
