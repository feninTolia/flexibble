'use client';
import React from 'react';
import Button from './Button';
import { useRouter } from 'next/navigation';

type Props = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};

const LoadMore = ({
  hasNextPage,
  hasPreviousPage,
  startCursor,
  endCursor,
}: Props) => {
  const router = useRouter();
  const handleNavigation = (direction: 'first' | 'next') => {
    const currentParams = new URLSearchParams(window.location.search);

    if (direction === 'next' && hasNextPage) {
      currentParams.delete('startcursor');
      currentParams.set('endcursor', endCursor);
    } else if (direction === 'first' && hasPreviousPage) {
      currentParams.delete('endcursor');
      currentParams.set('startcursor', startCursor);
    }

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);
  };

  return (
    <div className=" w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          type="button"
          title="First page"
          handleClick={() => handleNavigation('first')}
        />
      )}
      {hasNextPage && (
        <Button
          type="button"
          title="Next"
          handleClick={() => handleNavigation('next')}
        />
      )}
    </div>
  );
};

export default LoadMore;
