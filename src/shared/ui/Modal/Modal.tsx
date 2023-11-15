'use client';
import Spinner from '@/components/Shared/Spinner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useCallback, useRef, useState } from 'react';

const Modal = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onDismiss = useCallback(() => {
    setIsLoading(true);
    router.push('/');
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  return (
    <div ref={overlay} className=" modal min-w-[320px]" onClick={handleClick}>
      <div ref={wrapper} className="modal_wrapper">
        <button
          type="button"
          onClick={onDismiss}
          className="absolute top-6 right-6 hover:scale-105 transition-transform"
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <Image src="/close.svg" width={17} height={17} alt="close" />
          )}
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
