import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface Props {
  href?: string;
  title?: string;
  className?: string;
  children: ReactNode;
}

// simplifies NextJS/Links and not confused with the react-router Link
// Use for local routing in NextJS.
export const NextLink = ({ children, className = '', href, title }: Props) => {
  if (!href) {
    return <></>;
  }

  return (
    <div className={twMerge('whitespace-nowrap cursor-pointer', className)} title={title ?? ''}>
      <Link to={href}>{children}</Link>
    </div>
  );
};

// use for external links (https://infinity.xyz)
export const ExternalLink = ({ children, className = '', href, title }: Props) => {
  if (!href) {
    return <></>;
  }

  return (
    <div onClick={() => window.open(href)}>
      <a className={twMerge('whitespace-nowrap cursor-pointer', className)} title={title ?? ''}>
        {children}
      </a>
    </div>
  );
};
