import { largeIconButtonStyle } from 'utils/ui-constants';
import { twMerge } from 'tailwind-merge';
import { SVG } from './svg';

interface Props {
  className?: string;
}

export const Spinner = ({ className }: Props) => {
  return (
    <SVG.spinner className={twMerge(largeIconButtonStyle, 'text-gray-600 animate-spin fill-dark-card', className)} />
  );
};
