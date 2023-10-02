import Image from 'next/image';
import React, { MouseEventHandler, PropsWithChildren } from 'react';

interface IProps
  extends PropsWithChildren,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  leftIcon?: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  bgColor?: string;
  textColor?: string;
}

const Button = ({
  type = 'button',
  title,
  leftIcon,
  rightIcon,
  handleClick,
  isSubmitting,
  bgColor,
  textColor,
  ...props
}: IProps) => {
  return (
    <button
      type={type || 'button'}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 rounded-xl text-sm font-medium max-md:w-full
      ${isSubmitting ? ' bg-black/50' : bgColor || ' bg-primary-purple'}
      ${textColor || 'text-white'} `}
      onClick={handleClick}
      {...props}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right" />
      )}
    </button>
  );
};

export default Button;
