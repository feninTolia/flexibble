'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useCallback, useRef } from 'react';

const Modal = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const onDismiss = useCallback(() => {
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
    <div ref={overlay} className=" modal " onClick={handleClick}>
      <div ref={wrapper} className="modal_wrapper">
        <button
          type="button"
          onClick={onDismiss}
          className="absolute top-6 right-6"
        >
          <Image src="/close.svg" width={17} height={17} alt="close" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
