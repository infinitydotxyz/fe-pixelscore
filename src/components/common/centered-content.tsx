import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const CenteredContent = ({ children }: Props) => {
  return (
    <div className="h-full w-full flex justify-center items-center dark:text-dark-body text-light-body text-xl">
      {children}
    </div>
  );
};
