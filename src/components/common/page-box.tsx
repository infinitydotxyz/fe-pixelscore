import React from 'react';
import { Navbar } from 'components/common';
import { twMerge } from 'tailwind-merge';

interface Props {
  children?: React.ReactNode;
  className?: string;
  extraScrollHeight?: boolean; // set to false if you want to center the contents (connect page)
}

export const PageBox = ({ children, className = '', extraScrollHeight = true }: Props): JSX.Element => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col">
        <Navbar />
        <div className={twMerge('flex-1 mx-12', className)}>{children}</div>

        {extraScrollHeight && <div className="h-[300px]" />}
      </div>
    </>
  );
};
