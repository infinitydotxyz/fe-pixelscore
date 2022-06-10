import React from 'react';
import { Navbar } from 'components/common';
import { twMerge } from 'tailwind-merge';

interface Props {
  children?: React.ReactNode;
  footer?: JSX.Element;
  className?: string;
  pageClass?: string;
  extraScrollHeight?: boolean; // set to false if you want to center the contents (connect page)
}

export const PageBox = ({ children, className = '', pageClass = '', footer }: Props): JSX.Element => {
  return (
    <>
      <div className={twMerge('w-full max-h-screen flex flex-col overflow-y-auto', pageClass)}>
        <Navbar />
        <div className={twMerge('flex-1 mx-12', className)}>{children}</div>

        <div className="h-[300px] shrink-0" />

        {footer}
      </div>
    </>
  );
};
