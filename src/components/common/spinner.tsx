import { PacmanLoader } from 'react-spinners';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

export const Spinner = ({ className }: Props) => {
  return (
    <span className={twMerge(`w-12 h-12 ${className}`)}>
      <PacmanLoader size={20} margin={2} color="#ff2400" />
    </span>
  );
};
