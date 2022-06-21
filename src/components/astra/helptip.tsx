import { ReactNode } from 'react';
import { Tooltip } from './tooltip';
import { Placement } from '@floating-ui/core';

interface Props {
  children: ReactNode;
  content: ReactNode;
  placement?: Placement;
}

export const HelpTip = ({ content, children, placement = 'bottom' }: Props) => {
  return (
    <Tooltip
      content={content}
      className="z-50 w-max max-w-xl dark:text-dark-body text-light-body"
      placement={placement}
    >
      {children}
    </Tooltip>
  );
};
