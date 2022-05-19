import React from 'react';
import { Navbar } from 'components/common';
import { twMerge } from 'tailwind-merge';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export const PageBox = ({ children, className = '' }: Props): JSX.Element => {
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <Navbar />
        <div className={twMerge('flex-1 mx-12 mb-52', className)}>{children}</div>
      </div>
    </>
  );
};
