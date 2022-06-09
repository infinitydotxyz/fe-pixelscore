import { ReactNode } from 'react';
import { Toltip } from './toltip';
import { Placement } from '@floating-ui/core';

interface Props {
  children: ReactNode;
  content: string;
  placement?: Placement;
}

export const HelpTip = ({ content, children, placement = 'bottom' }: Props) => {
  return (
    <Toltip content={content} className="z-50 min-w-max" placement={placement}>
      {children}
    </Toltip>
  );
};
