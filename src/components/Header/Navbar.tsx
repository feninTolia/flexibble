import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className=" flexBetween navbar">
      <div className=" flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="Flexibble" />
        </Link>
        <ul className=" xl:flex hidden text-small gap-7"></ul>
      </div>
    </nav>
  );
};

export default Navbar;
