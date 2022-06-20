import React from 'react';
import { Navbar } from 'components/common';
import { twMerge } from 'tailwind-merge';

interface Props {
  children?: React.ReactNode;
  footer?: JSX.Element;
  className?: string;
  pageClass?: string;
  customHeader?: JSX.Element;
  extraScrollHeight?: boolean; // set to false if you want to center the contents (connect page)
}

export const PageBox = ({
  children,
  customHeader,
  className = '',
  pageClass = '',
  extraScrollHeight,
  footer
}: Props): JSX.Element => {
  return (
    <>
      <div className={twMerge('w-full max-h-screen flex flex-col overflow-y-auto overflow-x-hidden', pageClass)}>
        {customHeader ? customHeader : <Navbar />}
        <div className={twMerge('flex-1 mx-12', className)}>{children}</div>

        {extraScrollHeight && <div className="h-[300px] shrink-0" />}

        {footer}
      </div>
    </>
  );
};
