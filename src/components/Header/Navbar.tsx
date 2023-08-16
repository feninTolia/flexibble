import { NavLinks } from '@/shared/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AuthProviders from '../Auth/AuthProviders';
import { getCurrentUser } from '@/shared/lib/session';

const Navbar = async () => {
  const session = await getCurrentUser();
  console.log('session =-=-=-=-=-=', session);

  return (
    <nav className=" flexBetween navbar">
      <div className=" flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="Flexibble" />
        </Link>
        <ul className=" xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className=" flexCenter gap-4">
        {session?.user ? (
          <>
            {session.user.image && (
              <Link href={`/profile/${session?.user?.id}`}>
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={40}
                  height={40}
                  className=" rounded-full"
                />{' '}
              </Link>
            )}
            <Link href="/create-project">Share work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
