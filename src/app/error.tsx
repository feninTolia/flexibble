'use client';

import Button from '@/components/Shared/Button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className=" flexCenter flex-col my-8 gap-4">
      <h2 className="font-medium text-2xl p-4">Something went wrong!</h2>
      <Button
        title="Try again"
        onClick={reset}
        className="max-md:w-fit bg-gray"
      />
      <Link href={'/'}>
        <Button title="Go Home" className="max-md:w-fit" />
      </Link>
    </div>
  );
}
